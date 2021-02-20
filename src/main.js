
const { roasts, compliments, roastcommand, compliment, ttscomplimentcommand, roastidea, complimentidea, ttsroastcommand, coinflip } = require('./commands/general/general_purpose.js');
const { disconnectcommand, joincommand } = require('./commands/voice/voice_general.js');
const { setnick, setrole, createrole  } = require('./commands/staff/staff_general.js'); 
const { general_help, staff_help, voice_help } = require('./commands/help.js');
const { blacklistcommand, roleName, voteblacklist, rolewhite } = require('./commands/staff/staff_limiter.js');
const { yt_search, skip, queue_func, pause } = require('./commands/voice/voice_music.js');
const Discord = require('discord.js');
const client = new Discord.Client()
const dotenv = require('dotenv');
dotenv.config()
const queue = new Map();
const ytdl = require('ytdl-core');
const { google } = require('googleapis');
//^^^ Importing all our dependencies

client.on('ready', () => {
    console.log("Connected as " + client.user.tag);
    client.user.setActivity('you type ?help', {type: 'WATCHING'}).catch(console.error); //setting status and starting bot

})
//! I think the error is with the way we define the variables in the import, we need to import them in the same order we exported them, or it could be the way we exported them idk


// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"
const bot_secret_token = process.env.TOKEN;
const prefix = process.env.PREFIX;
const yt_token = process.env.YOUTUBE_TOKEN; //loading our env variables

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
    let extra_command = receivedMessage.content.substr(primaryCommand.length + 1).replace(/\s+/g, ' ').trim(); //gets everything after the command (Including possible paramaters)
    let user = receivedMessage.author;
    let member = receivedMessage.guild.member(user);
    let role = receivedMessage.guild.roles.cache.find(x => x.name === roleName); 

    const serverQueue = queue.get(receivedMessage.guild.id);

    console.log("Command received: " + primaryCommand);
    console.log("args: " + args);
    console.log("Extra Commands: " + extra_command);

    if(typeof role === 'object'){
        if( !receivedMessage.member.roles.cache.some(x => x.name === roleName) ){
            commands(primaryCommand,args, receivedMessage, sentence, serverQueue, splitCommand, extra_command );
        }
        else{
            return  //Making sure no one blacklisted can use the bot
        };
    } 
    else{
        commands(primaryCommand,args, receivedMessage, sentence, serverQueue, splitCommand, extra_command );
    };
       
   
}

async function commands(primaryCommand, args, receivedMessage, sentence, serverQueue, splitCommand, extra_command){ //function to run the commands
    if (primaryCommand == "roast") { //Runnning said commands 
        return roastcommand(args, receivedMessage);

    }
    else if(primaryCommand == "compliment"){
        return compliment(args, receivedMessage);
    } else if(primaryCommand == "join"){
        return joincommand(args, receivedMessage);
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
        return receivedMessage.reply("Just DM'd the commands");

    }
    else if(primaryCommand == "help" && receivedMessage.content.substr(6) == 'general'){
        return general_help(receivedMessage);
    }
    else if(primaryCommand == "help" && receivedMessage.content.substr(6) == 'staff'){
        return staff_help(receivedMessage);
    }
    else if(primaryCommand == "help" && receivedMessage.content.substr(6) == 'voice'){
        return voice_help(receivedMessage);
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
        return 
    }
    else if(primaryCommand == "coinflip" || primaryCommand == "flipcoin"){
        return coinflip(args, receivedMessage);
    }
    else if(primaryCommand == "setnick"){
        return setnick(args, receivedMessage);
    }else if(primaryCommand == "setrole"){
        return setrole(args, receivedMessage);
    }else if(primaryCommand == "createrole"){
        return createrole(args, receivedMessage, false, false);
    }else if(primaryCommand == "roastidea"){
        return roastidea(args, receivedMessage);
    }
    else if(primaryCommand == "complimentidea"){
        return complimentidea(args, receivedMessage);
     }
    else if(primaryCommand == "blacklist" || primaryCommand == "ignore"){
        return blacklistcommand(args, receivedMessage, 'blacklist', 'no');
     }
    else if(primaryCommand == "unblacklist" || primaryCommand == "unignore"){
        return blacklistcommand(args, receivedMessage, 'unblacklist', 'no');
     }
    else if(primaryCommand == "voteblacklist" || primaryCommand == "voteignore" || primaryCommand == "blacklistvote" || primaryCommand == "ignorevote"){
        return voteblacklist(args, receivedMessage);
     }
    else if(primaryCommand == "introduce"){
        const anotherembed = new Discord.MessageEmbed()
        .setTitle('Hello')
        .addField('Hi, I am Wombo bot', 'I have a handful of commands that you can use.')
        .addField('\u200b', 'type ?help\nif you want a list of commands')
        .addField('\u200b', '**Quick links**\n[Support server](https://discord.com/invite/VZp2tFD)\n[Commands Coming Soon](https://github.com/CerealSurya/Wombo-Bot/blob/master/README.md#coming-soon)', true)
        .addField('\u200b', '\n[Invite link](https://discordbotlist.com/bots/wombo)', true)
        .setThumbnail(client.user.avatarURL())
        .setColor(0x99ccff)
        return receivedMessage.channel.send(anotherembed);
    }
    else if(primaryCommand == "servercount"){
        return receivedMessage.channel.send(`I am in **${client.guilds.cache.size}** servers`);
    }
    else if(primaryCommand == "play" || primaryCommand == "p") {
        if (!receivedMessage.member.voice.channel){return receivedMessage.channel.send("You have to be in a voice channel to use this command")};
        return yt_search(receivedMessage, serverQueue, queue, args, primaryCommand, yt_token)
    }
    else if(receivedMessage.member.voice.channel){ //Checking if the bot and user is in a voicechannel before we play the voice channel commands music
        const channel = receivedMessage.member.voice.channel;
        await channel.members.forEach((x) => { //Going to need to change this later to have a dialogue if the bot is not in a channel
            if (x.id == client.user.id){
                if (primaryCommand == "skip" || primaryCommand == "s") {
                    return skip(receivedMessage, serverQueue);
                }
                else if(primaryCommand == "disconnect" || primaryCommand == "leave"){
                    return disconnectcommand(receivedMessage, queue);
                }
                else if (primaryCommand == "queue" || primaryCommand == "que") {
                    return queue_func(receivedMessage, serverQueue, {entry:'print_queue'});
                }
                else if (primaryCommand == "clear" && extra_command == 'queue') {
                    return queue_func(receivedMessage, serverQueue, {entry:'clear_queue'});
                }
                else if (primaryCommand == "remove" && extra_command == 'song') {
                    return queue_func(receivedMessage, serverQueue, {entry:'remove_song'});
                }
                else if (primaryCommand == "pause") {
                    return pause(receivedMessage, serverQueue, 'pause');
                }
                else if (primaryCommand == "resume") {
                    return pause(receivedMessage, serverQueue, 'resume');
                }
            }
        });
    }
    //else if(!receivedMessage.member.voice.channel){return receivedMessage.channel.send('You need to be in a voice channel to use this command')};
}
client.login(bot_secret_token);


