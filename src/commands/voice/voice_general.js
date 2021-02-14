
const ytdl = require('ytdl-core');
   


function disconnectcommand(receivedMessage, que){
    const sender_channel = receivedMessage.member.voice.channel;
    if (!sender_channel){return receivedMessage.channel.send("You need to be in a voice channel.")}
    try{
        const member = receivedMessage.guild.member(receivedMessage.author);
        const serverque = que.get(receivedMessage.guild.id);
        const bot_channel = serverque.connection.channel;
        if (serverque && serverque.connection.player.dispatcher != null){ //making sure there is a queue
            if(bot_channel.id == sender_channel.id){ //making sure the sender and the bot are in the same voice channel
                var voice_chat_size = bot_channel.members.size;
                if(voice_chat_size == 2 || member.hasPermission('MANAGE_CHANNELS') || receivedMessage.member.roles.cache.some(x => x.name === 'music')){
                    receivedMessage.channel.send('okay bye 📭 '); //if the requirments are met than we leave
                    que.delete(receivedMessage.guild.id);
                    receivedMessage.member.voice.channel.leave();
                }
                else{ //if the sender does not have the correct perms than we start a vote to kick the bot out of the vc
                    let counter_leave = 1
                    function private_listen(receivedMessage, serverque){
                        if (voice_chat_size > 3){var vote_number_leave = 2} //It is one lower then the amount of people in the chat cuz the person that sent this already voted
                        else if(voice_chat_size == 3){var vote_number_leave = 1} //!this one
                        receivedMessage.channel.send(`${String(vote_number_leave)} more votes to get me to leave this voicechat | Type 'l' if you want me to leave or just don't reply`).then(() => {
                            const filter = m => receivedMessage.author.id != m.author.id; 
                            receivedMessage.channel.awaitMessages(filter, { time: 20000, max: vote_number_leave, errors: ['time'] })
                                .then(messages => {
                                    var da_content = String(messages.first().content); 
                                    console.log(da_content);
                                    if (da_content == 'l'){ //if someone voted 
                                        counter_leave++;
                                        if (counter_leave >= vote_number_leave){ //make sure that we have the correct number of votes to kick
                                            receivedMessage.channel.send('okay bye 📭 ')
                                            que.delete(receivedMessage.guild.id);
                                            receivedMessage.member.voice.channel.leave();
                                            return
                                        }
                                        else{
                                            private_listen(receivedMessage, serverque);
                                        };
                                    };
                                }) 
                                .catch((err) => {
                                    console.log(err); //if time ran out
                                    receivedMessage.channel.send(`nvm, you took too long.`);
                                    return;
                                });
                        });
                    }
                    private_listen(receivedMessage, serverque);
                }
            }
        };
    }
    catch(err){ //if there is no queue than we run this
        receivedMessage.channel.send('okay bye 📭 ')
        receivedMessage.member.voice.channel.leave();
        console.log(err) //TODO: There is a problem with this tho, we need to make sure the bot and the sender are in the same channel
        return          //TODO its just a visual bug tho
    }
};

function joincommand(args, receivedMessage){
    if(receivedMessage.member.voice.channel){
        if(!receivedMessage.guild.voiceConnection){ //joins the vc that the sender is in
            receivedMessage.channel.send('Okay I joined 👍')
            receivedMessage.member.voice.channel.join();

        }

    }        
    else{
        receivedMessage.reply("You gotta be in a voice channel for me to connect. ");
    };
};
module.exports = { disconnectcommand, joincommand }