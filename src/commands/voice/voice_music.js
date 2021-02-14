
const ytdl = require('ytdl-core');
const { google } = require('googleapis');
const Discord = require('discord.js');
const { resolve } = require('../staff/staff_limiter');

function queue_func(receivedMessage, serverque, position){
    if (serverque && serverque.connection.player.dispatcher != null){
        const sender_channel = receivedMessage.member.voice.channel;
        const member = receivedMessage.guild.member(receivedMessage.author);
        const bot_channel = serverque.connection.channel
            if(bot_channel.id == sender_channel.id){ //chekcs to make sure the sender of the message and the bot is in the same vc
                var voice_chat_size = bot_channel.members.size;
                if(voice_chat_size == 2 || member.hasPermission('MANAGE_CHANNELS') || receivedMessage.member.roles.cache.some(x => x.name === 'music')){
                    if(position.entry == 'clear_queue'){ //if conditions are met than it allows the command
                        receivedMessage.channel.send('Cleared the Queue 👍')
                        serverque.songs = [];
                    }
                    else if(position.entry == 'remove_song'){ //this is the remove song based off of the same permissions
                        queue_func(receivedMessage, serverque, {entry:'print_queue'});
                        receivedMessage.channel.send(`Which song would you like to remove. | Type 1 for the first song 2 for the second etc.`).then(() => {
                            const filter = m => receivedMessage.author.id == m.author.id; 
                            receivedMessage.channel.awaitMessages(filter, { time: 20000, max: 1, errors: ['time'] }) //allows sender to send follow up message on what song to remove
                                .then(messages => {
                                    var number = String(messages.first().content).replace(/\s+/g, ''); 
                                    var number = parseInt(number);
                                    console.log(number);
                
                                    try{
                                        const da_song = serverque.songs[number-1].title;
                                        serverque.songs.splice(number - 1, 1)
                                        if (number == 1){ //removes the song from queue
                                            return receivedMessage.channel.send(`I have removed the **${da_song}** from the queue\nhowever, if this song is playing right now it is going to keep playing use the **?skip** command to skip it`)
                                        }
                                        else{return receivedMessage.channel.send(`Okay I have removed the **${da_song}** from the queue`)};
                                    }
                                    catch(err){
                                        console.log(err);
                                        return receivedMessage.channel.send('Something went wrong, make sure you typed in a number with no spaces.')
                                    }
                                    
                                }) 
                                .catch((err) => {
                                    console.log(err);
                                    receivedMessage.channel.send(`Whoops, you took too long, try again.`);
                                    return
                                });
                        });
                    }
                }
                else{
                    receivedMessage.channel.send('Sorry, you need to either have **Manage channel** perms or have the **music** role to use this command.')
                }
            }
    };
    var new_queue = false
    try{
        if (serverque.songs.length <2){ //checks if this is a new queue
            var new_queue = true;
            console.log('New Queue Initiated')
        }
        else{var new_queue = false};

    }
    catch(err){
        console.log('New Queue Initiated');
        var new_queue = true
    }
    var i;
    if (position.entry == 'print_queue' && serverque){ //prints the queue if there is an actual queue
        if (serverque.connection.player.dispatcher == null){
            receivedMessage.channel.send('There is no queue. Join up a voicechat and do `?play some song`');
            return
        }
        else if(serverque.songs.length > 0){
            for (i = 0; i < serverque.songs.length; i++) {
                receivedMessage.channel.send(`${i+1}. ${"`"}${serverque.songs[i].title}${"`"}`);
            }
        }
        else{return receivedMessage.channel.send('There is no queue. Join up a voicechat and do `?play some song`')};
    }
    if (position.entry == 'match_my_song'){ //used to find which postion a song is in a queue
        if (new_queue == false){
            console.log('popcorn')
            for (i = 0; i < serverque.songs.length; i++) {
                if (serverque.songs[i].title == position.title){
                    return i + 1;
                }
            }
        }
        else{
            return 1;
        }    
    }
   
}
async function yt_search(receivedMessage, serverQueue, queue, args, primaryCommand, yt_token){ //pings yt for the song.
    const voicechannel = receivedMessage.member.voice.channel;


    const perm = voicechannel.permissionsFor(receivedMessage.client.user);

    if (!perm.has("CONNECT") || !perm.has("SPEAK")) {
        return receivedMessage.channel.send("I need the permissions to join and speak in your voice channel");
    }

    if (primaryCommand == 'p'){
        var sentence = String(receivedMessage.content.substr(3));
    }
    else if (primaryCommand == 'play'){
        var sentence = String(receivedMessage.content.substr(6));
    }
    if (args.length > 0){
        if (sentence.startsWith('https://www.youtube.com/watch?v=')){ //checing if the parameter is a direct link
            if (sentence.length>43){
                var channel_url = String(sentence.slice(43)); //The ID is 11 digits all the time (check that tho)
                var video_id = String(sentence.slice(32, -channel_url.length));
            }
            else{
                var video_id = String(sentence.substr(32));
            }
            console.log(video_id);
            await google.youtube('v3').videos.list({ //pinging yt api based on the id from link
                key: yt_token,
                part: 'snippet',
                id: video_id,
                maxResults: 1,
            }).then((response) =>{
                let song_title = response.data.items[0].snippet.title;
                var song_channel = response.data.items[0].snippet.channelTitle;
                var song_thumbnail = response.data.items[0].snippet.thumbnails.default.url; //getting info
                song_title = String(song_title).split("&quot;").join('"');
                song_title = String(song_title).split("&#39;").join("'"); //removing the special characters with their actual counter parts
                song_title = String(song_title).split("&amp").join("&");
                var song = {
                    title: song_title,
                    url: sentence,
                    artist: song_channel,
                    thumbnail: song_thumbnail //packing the info in an object
                };
                execute_play(receivedMessage, serverQueue, queue, song, voicechannel) //shipping it off to the execute function to create the queue
                return;
            }).catch((err) => console.log(err));
        }
        else if( sentence.startsWith('https://www') ){receivedMessage.channel.send('Sorry we only support youtube url searches')}
        else{
            await google.youtube('v3').search.list({
                key: yt_token,
                part: 'snippet',
                q: sentence,
                maxResults: 1,
                type: ["Video"]
            }).then((response) =>{
                let song_title = response.data.items[0].snippet.title;
                var song_channel = response.data.items[0].snippet.channelTitle;
                var song_thumbnail = response.data.items[0].snippet.thumbnails.default.url;
                var song_url = 'https://www.youtube.com/watch?v=' + String(response.data.items[0].id.videoId);
                song_title = String(song_title).split("&quot;").join('"');
                song_title = String(song_title).split("&#39;").join("'");
                song_title = String(song_title).split("&amp").join("&"); //same thing except without a direct link paramater

                var song = {
                    title: song_title,
                    url: song_url,
                    artist: song_channel,
                    thumbnail: song_thumbnail //packing the info in an object
                };
                execute_play(receivedMessage, serverQueue, queue, song, voicechannel)//shipping it off to the execute function to create the queue
            }).catch((err) => console.log(err));
        }
    }
    else{
        return receivedMessage.channel.send('whoops something went wrong'); // this is when something happens
    }
}

async function execute_play(receivedMessage, serverque, que, song, voicechannel) {
    function send_embedd(receivedMessage, song, serverque, queobj){
        const place_in_queue = queue_func(receivedMessage, serverque, {entry: 'match_my_song', title: song.title}) //gets the position in queue
        const embed = new Discord.MessageEmbed() //send embedd function to send the message in the chat
        .setTitle(song.title)
        .setURL(song.url)
        .setAuthor(`${receivedMessage.author.username} added a song`, receivedMessage.author.avatarURL())
        .addField('Artist:', song.artist, true)
        .addField('Position in Queue', place_in_queue, true)
        .setThumbnail(song.thumbnail) 
        .setColor(0x3399ff)
        queobj.textChannel.send(embed);
    };

    if (!serverque || serverque.connection.player.dispatcher == null) { //making sure we don't create a new queue if there is already one
        if (serverque){ //this gets triggered whenever the bot leaves the channel, so there is a queue but there is no dispatcher
            serverque.songs = [];
        };

        const queueobj = {
            textChannel: receivedMessage.channel,
            voicechannel: voicechannel,
            connection: null,
            songs: []
        };

        que.set(receivedMessage.guild.id, queueobj);
        queueobj.songs.push(song);

        try {
            var connection = await voicechannel.join();
            queueobj.connection = connection;
            send_embedd(receivedMessage, song, serverque, queueobj); //joining up the vc, sends the embedd, and plays the song
            play(receivedMessage, queueobj.songs[0], que);
        } catch (err) {
            console.log(err);
            que.delete(receivedMessage.guild.id);
            return receivedMessage.channel.send(err); //this shoudn't get triggered
        }
    } else { //If we are just adding songs to existing queue
        serverque.songs.push(song);
        console.log('here')
        send_embedd(receivedMessage, song, serverque, serverque);

    }
}

function skip(receivedMessage, serverque) {
    if (serverque && serverque.connection.player.dispatcher != null){
        const sender_channel = receivedMessage.member.voice.channel;
        const member = receivedMessage.guild.member(receivedMessage.author);
        const bot_channel = serverque.connection.channel
        const queue_length = serverque.songs.length;
            if(bot_channel.id == sender_channel.id){  //chekcs to make sure the sender of the message and the bot is in the same vc
                var voice_chat_size = bot_channel.members.size;
                if(voice_chat_size == 2 || member.hasPermission('MANAGE_CHANNELS') || receivedMessage.member.roles.cache.some(x => x.name === 'music')){
                    if (queue_length > 1){ //if the conditions are met than we run the command
                        receivedMessage.channel.send(`Skipped ⏩| Now Playing: **${serverque.songs[1].title}**`);
                        serverque.connection.dispatcher.end();
                        return
                    }
                    else{ //this is if there is only one song in the queue, so we need a specific dialougue. 
                        receivedMessage.channel.send(`Skipped ⏩| Now Playing: **No song queued**`);
                        serverque.connection.dispatcher.end();
                        return
                    }
                }
                else{
                    let counter_skip = 1 //if the sender does not have the required perms then we have a vote system
                    function private_listen(receivedMessage, serverque){
                        if (voice_chat_size > 3){var vote_number_skip = 2} //It is one lower then the amount of people in the chat cuz the person that sent this already voted
                        else if(voice_chat_size == 3){var vote_number_skip = 1}
                        receivedMessage.channel.send(`I will skip **${serverque.songs[0].title}** if I get ${String(vote_number_skip)} more votes* | Type 's' if you want to skip or just don't reply`).then(() => {
                            const filter = m => receivedMessage.author.id != m.author.id; 
                            receivedMessage.channel.awaitMessages(filter, { time: 20000, max: vote_number_skip, errors: ['time'] })
                                .then(messages => {
                                    var da_content = String(messages.first().content); 
                                    console.log(da_content);
                                    if (da_content == 's'){
                                        counter_skip++; 
                                        if (counter_skip >= vote_number_skip){ //making sure we have the correct amount of votes before we skip
                                            if (queue_length > 1){
                                                receivedMessage.channel.send(`Skipped ⏩| Now Playing: **${serverque.songs[1].title}**`);
                                                serverque.connection.dispatcher.end();
                                                return
                                            }
                                            else{ //need a separate dialogue if there is only one song in the queue
                                                receivedMessage.channel.send(`Skipped ⏩| Now Playing: **No song queued**`);
                                                serverque.connection.dispatcher.end();
                                                return
                                            }

                                        }
                                        else{ //if we do not have enough votes than we re run this command
                                            private_listen(receivedMessage, serverque);
                                        };
                                    };
                                }) 
                                .catch((err) => {
                                    console.log(err);
                                    receivedMessage.channel.send(`nvm, you took too long.`);
                                    return;
                                });
                        });
                    }
                    private_listen(receivedMessage, serverque); //need to first run the function
                }
            }
    }
    else{
        return receivedMessage.channel.send("There are no songs for me to skip...")
    }
}

function play(receivedMessage, song, que) {
    const serverque = que.get(receivedMessage.guild.id);
    console.log(song);
    if (!song){ //if there is no other song in the queue, meaning we have finished the queue this runs
        serverque.songs == []; //resets the queue
        que.delete(receivedMessage.guild.id);
        serverque.connection.voice.channel.leave(); //leaves the vc
        return;
    }

    const dispatcher = serverque.connection //plays the song
        .play(ytdl(song.url))
        .on("finish", () => {
            serverque.songs.shift();
            play(receivedMessage, serverque.songs[0], que);
        })
        .on("error", error => console.error(error));
}

function pause(receivedMessage ,serverque, position){
    if (serverque && serverque.connection.player.dispatcher != null){
        const sender_channel = receivedMessage.member.voice.channel;
        const member = receivedMessage.guild.member(receivedMessage.author);
        const bot_channel = serverque.connection.channel
            if(bot_channel.id == sender_channel.id){ //checks to make sure the sender is in the same vc as the bot
                var voice_chat_size = bot_channel.members.size;
                if(voice_chat_size == 2 || member.hasPermission('MANAGE_CHANNELS') || receivedMessage.member.roles.cache.some(x => x.name === 'music')){
                    if(position == 'pause'){ //if the requirements are met than it either runes the pause or resume command
                        serverque.connection.dispatcher.pause();
                        receivedMessage.channel.send('Paused 🛑')
                    }
                    else if(position == 'resume'){
                        serverque.connection.dispatcher.resume();
                        receivedMessage.channel.send('Resumed 🎵')
                    }
                    else{return};
                }
                else{ //if not it sends the warning
                    receivedMessage.channel.send('Sorry, you need to either have **Manage channel** perms or have the **music** role to use this command.')
                }
            }
    }
    else if(position == 'pause'){return receivedMessage.channel.send('There is no song for me to pause.')}
    else if(position == 'resume'){return receivedMessage.channel.send('There is no song for me to resume.')}
}


module.exports = { yt_search,execute_play, skip, queue_func, pause }