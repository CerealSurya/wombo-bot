
import ytdl from 'ytdl-core';
import googleTTS from 'google-tts-api'
import discordTTS from 'discord-tts'
   
export function vcroastcommand(args ,receivedMessage, usecase){
    if(receivedMessage.member.voice.channel){
        if(!receivedMessage.guild.voiceConnection && args.length > 0){
            receivedMessage.member.voice.channel.join()
            .then(connection =>{
                receivedMessage.channel.send("Aight lets do this");

                    const mention = receivedMessage.mentions.users.first();
                    const username = mention.username;
                    
                    const stream = discordTTS.getVoiceStream(username +usecase[(Math.floor(Math.random() * usecase.length))]);
                    const dispatcher = connection.play(stream);
                    dispatcher.on("end", end => {receivedMessage.member.voice.channel.leave()});
                })
                .catch(console.error);
        
        }
        else{
            receivedMessage.reply('```You need to @ someone, or type their username```')
        };
    }        
    else{
        receivedMessage.reply("You gotta be in a vc for me to roast someone in it. ");
    };
};

//npm install --save google-tts-api
export function disconnectcommand(args, receivedMessage){
    if(receivedMessage.member.voice.channel){
        if(!receivedMessage.guild.voiceConnection){
            receivedMessage.channel.send('okay bye 📭 ')
            receivedMessage.member.voice.channel.leave();
        }

    }        
    
    else{
        receivedMessage.reply("I gotta be in a vc for me to disconnect. ")
    };
};

export function joincommand(args, receivedMessage){
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

