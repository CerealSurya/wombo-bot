
import ytdl from 'ytdl-core';
import discordTTS from 'discord-tts';
import { roasts, compliments } from './general_purpose.js'

export function vcroastcommand(args ,receivedMessage){
    if(receivedMessage.member.voice.channel){
        if(!receivedMessage.guild.voiceConnection && args.length > 0){
            receivedMessage.member.voice.channel.join()
                .then(connection =>{
                    receivedMessage.channel.send("Starting to roast these plebs");

                    const mention = receivedMessage.mentions.users.first();
                    const username = mention.username;
                    
                    const stream = discordTTS.getVoiceStream(username +roasts[(Math.floor(Math.random() * roasts.length))]);
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

export function earrapecommand(argument, receivedMessage){
    if(receivedMessage.member.voice.channel){
        if(!receivedMessage.guild.voiceConnection){
            receivedMessage.member.voice.channel.join()
                .then(connection =>{
                    receivedMessage.channel.send("Better deafen urself cuz ||shit|| getting real")
                    const stream = ytdl('https://www.youtube.com/watch?v=OwTToclvHLg', { filter: 'audioonly' });
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

export function disconnectcommand(args, receivedMessage){
    if(receivedMessage.member.voice.channel){
        if(!receivedMessage.guild.voiceConnection){
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
            receivedMessage.member.voice.channel.join();

        }

    }        
    else{
        receivedMessage.reply("You gotta be in a voice channel for me to connect. ");
    };
};