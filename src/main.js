import { roastcommand, compliment, ttscomplimentcommand, roastidea, complimentidea, ttsroastcommand } from './commands/general_purpose.js';
import { vcroastcommand, earrapecommand, disconnectcommand, joincommand } from './commands/general_voice.js';
import { blacklistcommand, setnick  } from './commands/general_staff.js'; //Working on these commands
import config from './config.js';
import Discord from 'discord.js';
//Getting right imports, aswell as commands in other scripts



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
    var commandlist = ["``` ?roast - To roast someone",  //List of all working comands
    "\n ?ttsroast - to roast someone in tts", 
    "\n ?compliment - to make up for all the mean things you were saying", 
    "\n ?ttscompliment - to compliment someone in tts",
    "\n ?coinflip - to flip a coin", 
    "\n ?vcroast - joins the vc and flames up people", 
    "\n ?disconnect - to disc from a vc", 
    "\n ?join - to join a vc",
    "\n ?request - use this to request things that you want added to the bot. Like some more roasts or a new feature.",
    "\n ?setnick - if you have Manage nickname perms then you can use this command to change someone in the servers nick name",
    "\n ?roastidea - DMs you a roast idea so you can flame your friends",
    "\n ?complimentidea - DMs you a compliment idea so you can make up for the mean things you said",
    "\n ?earrape - If you want to be hella annoying send this command while u in a vc and earrape everyone in it",

    //TODO: Set up an intro message, wnenever it joins a server it says hi
    "\n[Note - there are not much vcroasts and they are not well maintained]",
    "```"];
    let fullCommand = receivedMessage.content.substr(1); // Remove the leading exclamation mark
    let sentence = receivedMessage.content.substr(8); // gets everything after the request
    let splitCommand = fullCommand.split(" "); // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0]; // The first word directly after the exclamation is the command
    let args = splitCommand.slice(1); // All other words are args/parameters/options for the command



    console.log("Command received: " + primaryCommand);
    console.log("args: " + args); // There may not be any args

    if (primaryCommand == "roast") { //Runnning said commands 
        roastcommand(args, receivedMessage);

    } else if (primaryCommand == "ttsroast"){

        ttsroastcommand(args, receivedMessage);
    } else if(primaryCommand == "vcroast"){

        vcroastcommand(args ,receivedMessage)
    }  else if(primaryCommand == "compliment"){

        compliment(args, receivedMessage);
    } else if(primaryCommand == "join"){

        joincommand(args, receivedMessage);
    } 
    else if(primaryCommand == "help"){
        receivedMessage.reply("Aight just DM'd u my commands");
        receivedMessage.author.send("Here are my commands: \n" + commandlist);
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
        ttscomplimentcommand(args, receivedMessage)
    } else if(primaryCommand == "coinflip"){
        var x = Math.floor(Math.random() * 2)
        if(x==0){
            receivedMessage.channel.send("Heads");
        }
        else if(x==1){
            receivedMessage.channel.send("Tails");
        };
    }
     else if(primaryCommand == "setnick"){
         return
        // setnick(args, receivedMessage);
    } else if(primaryCommand == "roastidea"){
        roastidea(args, receivedMessage);
    }
     else if(primaryCommand == "complimentidea"){
        complimentidea(args, receivedMessage);
     }
     else if(primaryCommand == "blacklist" || primaryCommand == "ignore"){
        return;
        // blacklistcommand(args, receivedMessage);
     }
     else if(primaryCommand == "introduce"){
        receivedMessage.channel.send('Hi, I am Wombo bot, and I have a handful of commands that you can use. Whenever I am turned on that is 👁️👄👁️ 😏 \ntype ?help if you want a list of commands')
     }
     else if(primaryCommand == "earrape"){
        earrapecommand(args, receivedMessage);
     }
       
   
}


client.login(bot_secret_token);


