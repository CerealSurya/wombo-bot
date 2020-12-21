
const ytdl = require('ytdl-core');
const { google } = require('googleapis');
require('dotenv').config();


async function execute_play(receivedMessage, serverque, args, split, command, token) {
    function song_closure(i, callback){
        return function(){
            console.log('made it');
            return callback(i)
        }
    }
    if (command == 'p'){
        var sentence = String(receivedMessage.content.substr(3));
    }
    else if (command == 'play'){
        var sentence = String(receivedMessage.content.substr(6));
    }

    const voicechannel = receivedMessage.member.voice.channel;
    if (!voicechannel){return receivedMessage.channel.send("You need to be in a voice channel for me to play music")}

    const perm = voicechannel.permissionsFor(receivedMessage.client.user);

    if (!perm.has("CONNECT") || !perm.has("SPEAK")) {
        return receivedMessage.channel.send("I need the permissions to join and speak in your voice channel");
    }
    if (args.length > 0){
        await google.youtube('v3').search.list({
            key: token,
            part: 'snippet',
            q: sentence,
            maxResults: 1
        }).then(( song_closure(response, function(response){
            console.log(`Title: ${response.items[0].snippet.title}\nUrl: https://www.youtube.com/watch?v=${response.items[0].id.videoId}`);
            var song_title = response.items[0].snippet.title;
            var song_url = 'https://www.youtube.com/watch?v=' + String(response.items[0].id.videoId)
            console.log(song_title, song_url);
        })).catch((err) => console.log(err)));

        console.log('yay')
    }
    else{
        return receivedMessage.channel.send('whoops something went wrong'); // this is when something happens
    }
    const song = {
        title: song_title,
        url: song_url,
    };
    console.dir(song);

    if (!serverque) {
        const queueContruct = {
        textChannel: receivedMessage.channel,
        voicechannel: voicechannel,
        connection: null,
        songs: [],
        volume: 1,
        playing: true
        };

        queue.set(receivedMessage.guild.id, queueContruct);

        queueContruct.songs.push(song);

        try {
            var connection = await voicechannel.join();
            queueContruct.connection = connection;
            play(receivedMessage.guild, queueContruct.songs[0]);
        } catch (err) {
            console.log(err);
            queue.delete(receivedMessage.guild.id);
            return receivedMessage.channel.send(err);
        }
    } else {
            serverque.songs.push(song);
            return receivedMessage.channel.send(`${song.title} has been added to the queue!`);
    }
}

function skip(receivedMessage, serverque) {
    if (!receivedMessage.member.voice.channel){return receivedMessage.channel.send("You have to be in a voice channel to use this command")};
    if (!serverque){return receivedMessage.channel.send("There is no song that I could skip!")}
    serverque.connection.dispatcher.end();
}
function stop(receivedMessage, serverque) {
    if (!receivedMessage.member.voice.channel){return receivedMessage.channel.send("You have to be in a voice channel to use this command")}
    serverque.songs = [];
    serverque.connection.dispatcher.end();
}

function play(guild, song) {
    const serverque = queue.get(guild.id);
    if (!song) {
        serverque.voicechannel.leave();
        queue.delete(guild.id);
        return;
    }
    const dispatcher = serverque.connection
    .play(ytdl(song.url))
    .on("finish", () => {
        serverque.songs.shift();
        play(guild, serverque.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolume(serverque.volume);
  serverque.textChannel.send(`Playing: **${song.title}**`);
}

module.exports = { execute_play, skip, stop, play }