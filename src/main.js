
import { roastcommand, compliment, ttscomplimentcommand, roastidea, complimentidea, ttsroastcommand, roasts, compliments, coinflip } from './commands/general/general_purpose.js';
import { vcroastcommand, earrapecommand, disconnectcommand, joincommand } from './commands/voice/voice_general.js';
import { setnick, setrole, createrole  } from './commands/staff/staff_general.js'; 
import { general_help, staff_help, voice_help } from './commands/help.js';
import { blacklistcommand, roleName, voteblacklist, rolewhite } from './commands/staff/staff_limiter.js';
import config from './config.js';
import Discord from 'discord.js';



const client = new Discord.Client()
client.on('ready', () => {
    console.log("Connected as " + client.user.tag);
    client.user.setActivity('you type ?help', {type: 'WATCHING'}).catch(console.error);

})



// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"
const bot_secret_token = config.token
const prefix = config.prefix

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }
    
    if (receivedMessage.content.startsWith(prefix)) {
        processCommand(receivedMessage)
    }
})


async function processCommand(receivedMessage) {

    //TODO: Set up an intro message, wnenever it joins a server it says hi
    let fullCommand = receivedMessage.content.substr(1); // Remove the leading exclamation mark
    let sentence = receivedMessage.content.substr(8); // gets everything after the request
    let splitCommand = fullCommand.split(" "); // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0]; // The first word directly after the exclamation is the command
    let args = splitCommand.slice(1); // All other words are args/parameters/options for the command
    let user = receivedMessage.author;
    let member = receivedMessage.guild.member(user);
    let role = receivedMessage.guild.roles.cache.find(x => x.name === roleName); 
    let whiterole = receivedMessage.guild.roles.cache.find(x => x.name === rolewhite); 

    console.log("Command received: " + primaryCommand);
    console.log("args: " + args); // There may not be any args

    if(typeof role === 'object'){
        if( !receivedMessage.member.roles.cache.some(x => x.name === roleName) ){
            commands(primaryCommand,args, receivedMessage, sentence );
        }
        else{
            return
        };
    } 
    else{
        commands(primaryCommand,args, receivedMessage, sentence );
    };
       
   
}

function commands(primaryCommand, args, receivedMessage, sentence){
    if (primaryCommand == "roast") { //Runnning said commands 
        roastcommand(args, receivedMessage);

    } else if (primaryCommand == "ttsroast"){
        return;
    } else if(primaryCommand == "vcroast"){
        vcroastcommand(args ,receivedMessage, roasts);

    } else if(primaryCommand == "vccompliment"){

        vcroastcommand(args, receivedMessage, compliments)
    }  else if(primaryCommand == "compliment"){

        compliment(args, receivedMessage);
    } else if(primaryCommand == "join"){

        joincommand(args, receivedMessage);
    } 
    else if(primaryCommand == "help" && receivedMessage.content.substr(6) == ''){
        const embed = new Discord.MessageEmbed()
        .setTitle('Help')
        .addField('\u200b', '\u200b')
        .addField('`?help general`', 'any general commands', true)
        .addField('`?help staff`', 'any staff\ncommands', true)
        .addField('`?help voice`', 'any voicechat commands', true)
        .addField('\u200b', '\u200b')
        .addField('Quick links', '[Support server](https://discord.com/invite/VZp2tFD)\n[Commands Coming Soon](https://github.com/CerealSurya/Wombo-Bot/blob/master/README.md#coming-soon)\n[Invite link](https://discordbotlist.com/bots/wombo)')
        .setThumbnail(client.user.avatarURL())
        .setColor(0x99ccff)
        receivedMessage.author.send(embed);
        receivedMessage.reply("Just DM'd the commands");

    }
    else if(primaryCommand == "help" && receivedMessage.content.substr(6) == 'general'){
        general_help(receivedMessage);
    }
    else if(primaryCommand == "help" && receivedMessage.content.substr(6) == 'staff'){
        staff_help(receivedMessage);
    }
    else if(primaryCommand == "help" && receivedMessage.content.substr(6) == 'voice'){
        voice_help(receivedMessage);
    }
    else if(primaryCommand == "request"){
        if (args.length == 0){
            receivedMessage.reply('You need to type in stuff that you want to request dum dum');
        }

        else{
            const user = client.users.cache.get('321365768950513666');
            user.send(`${receivedMessage.author} requested -  ${sentence}`);
            receivedMessage.author.send('I have put in your request');
        };
     }
    else if(primaryCommand == "disconnect" || primaryCommand == "leave"){
        disconnectcommand(args, receivedMessage);
     }
    else if(primaryCommand == "ttscompliment"){
        return
    }else if(primaryCommand == "coinflip" || primaryCommand == "flipcoin"){
       coinflip(args, receivedMessage);
    }
    else if(primaryCommand == "setnick"){
        setnick(args, receivedMessage);
    }else if(primaryCommand == "setrole"){
        setrole(args, receivedMessage);
    }else if(primaryCommand == "createrole"){
        createrole(args, receivedMessage, false, false);
    }else if(primaryCommand == "roastidea"){
        roastidea(args, receivedMessage);
    }
    else if(primaryCommand == "complimentidea"){
        complimentidea(args, receivedMessage);
     }
    else if(primaryCommand == "blacklist" || primaryCommand == "ignore"){
        blacklistcommand(args, receivedMessage, 'blacklist', 'no');
     }
    else if(primaryCommand == "unblacklist" || primaryCommand == "unignore"){
        blacklistcommand(args, receivedMessage, 'unblacklist', 'no');
     }
    else if(primaryCommand == "voteblacklist" || primaryCommand == "voteignore" || primaryCommand == "blacklistvote" || primaryCommand == "ignorevote"){
        voteblacklist(args, receivedMessage);
     }
    else if(primaryCommand == "introduce"){
        const anotherembed = new Discord.MessageEmbed()
        .setTitle('Hello')
        .addField('Hi, I am Wombo bot', 'I have a handful of commands that you can use. Whenever I am turned on that is 👁️👄👁️')
        .addField('\u200b', 'type ?help\nif you want a list of commands')
        .addField('\u200b', '**Quick links**\n[Support server](https://discord.com/invite/VZp2tFD)\n[Commands Coming Soon](https://github.com/CerealSurya/Wombo-Bot/blob/master/README.md#coming-soon)', true)
        .addField('\u200b', '\n[Invite link](https://discordbotlist.com/bots/wombo)', true)
        .setThumbnail(client.user.avatarURL())
        .setColor(0x99ccff)
        receivedMessage.channel.send(anotherembed);
    }
    else if(primaryCommand == "earrape"){
        return;
        // earrapecommand(args, receivedMessage);
     }
}
client.login(bot_secret_token);


