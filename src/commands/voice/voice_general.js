
const ytdl = require('ytdl-core');
   


function disconnectcommand(receivedMessage, que){
    const sender_channel = receivedMessage.member.voice.channel;
    if (!sender_channel){return receivedMessage.channel.send("You need to be in a voice channel.")}
    try{
        const member = receivedMessage.guild.member(receivedMessage.author);
        const serverque = que.get(receivedMessage.guild.id);
        const bot_channel = serverque.connection.channel;
        if (serverque && serverque.connection.player.dispatcher != null){
            if(bot_channel.id == sender_channel.id){
                var voice_chat_size = bot_channel.members.size;
                if(voice_chat_size == 2 || member.hasPermission('MANAGE_CHANNELS') || receivedMessage.member.roles.cache.some(x => x.name === 'music')){
                    receivedMessage.channel.send('okay bye 📭 ');
                    que.delete(receivedMessage.guild.id);
                    receivedMessage.member.voice.channel.leave();
                }
                else{
                    let counter_leave = 1
                    function private_listen(receivedMessage, serverque){
                        if (voice_chat_size > 3){var vote_number_leave = 2} //It is one lower then the amount of people in the chat cuz the person that sent this already voted
                        else if(voice_chat_size == 3){var vote_number_leave = 1}
                        receivedMessage.channel.send(`${String(vote_number_leave)} more votes to get me to leave this voicechat | Type 'l' if you want me to leave or 'n' for no.`).then(() => {
                            const filter = m => receivedMessage.author.id != m.author.id; 
                            receivedMessage.channel.awaitMessages(filter, { time: 20000, max: vote_number_leave, errors: ['time'] })
                                .then(messages => {
                                    var da_content = String(messages.first().content); 
                                    console.log(da_content);
                                    if (da_content == 'l'){
                                        counter_leave++;
                                        if (counter_leave >= vote_number_leave){
                                            receivedMessage.channel.send('okay bye 📭 ')
                                            que.delete(receivedMessage.guild.id);
                                            receivedMessage.member.voice.channel.leave();
                                            return
                                        }
                                        else{
                                            private_listen(receivedMessage, serverque);
                                        };
                                    };
                                    if (da_content == 'n'){
                                        counter_skip = 1
                                        return receivedMessage.channel.send(`Command has failed, guess Im stayin here for a little while longer.🙂`);
                                    }
                                }) 
                                .catch((err) => {
                                    console.log(err);
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
    catch(err){
        receivedMessage.channel.send('okay bye 📭 ')
        receivedMessage.member.voice.channel.leave();
        console.log(err)
        return
    }
};

function joincommand(args, receivedMessage){
    if(receivedMessage.member.voice.channel){
        if(!receivedMessage.guild.voiceConnection){
            receivedMessage.channel.send('Okay I joined 👍')
            receivedMessage.member.voice.channel.join();

        }

    }        
    else{
        receivedMessage.reply("You gotta be in a voice channel for me to connect. ");
    };
};
function test(argument, receivedMessage, title){
    if(receivedMessage.member.voice.channel){
        if(!receivedMessage.guild.voiceConnection){
            receivedMessage.member.voice.channel.join()
                .then(connection =>{
                    receivedMessage.channel.send(`Now playing ${title}`)
                    const stream = ytdl(argument);
                    const dispatcher = connection.play(stream);

                    dispatcher.on('end', () => receivedMessage.member.voice.channel.leave());
                })
                .catch(console.error);
        }
    }
    else{
        receivedMessage.reply("You gotta be in a vc for me to join it. ");
    };    
    
}
module.exports = { disconnectcommand, joincommand, test }