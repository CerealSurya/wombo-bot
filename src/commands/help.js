
const Discord = require('discord.js');


function staff_help(receivedMessage){
    const embed = new Discord.MessageEmbed()
    .setTitle('Staff Commands')
    .addField('\u200b', '`?ignore`\nignores whoever you mention, basically it means that I will ignore their commands to me (only one person at a time)')
    .addField('\u200b', '`?unignore`\nit unignores whoever you mention (only one person at a time)')
    .addField('\u200b', '`?voteignore`\nto start a vote to get me to start ignoring whoever you mention. (one person at a time)')
    .addField('\u200b', '`?setnick`\ncan be used to set the nickname of someone in the server whose role is below the bot')
    .setThumbnail('https://i.ibb.co/dDxyxXf/staff.png')
    .setColor(0x99ccff)
    receivedMessage.channel.send(embed);
}


function general_help(receivedMessage){
    const embed = new Discord.MessageEmbed()
    .setTitle('General Commands')
    .addField('\u200b','`?roast`\nTo get Wombo bot to roast someone\n ')
    .addField('\u200b', '`?compliment`\nTo get Wombo bot to compliment someone')    
    .addField('\u200b', '`?coinflip`\nflip a coin')   
    .addField('\u200b', '`?request`\nIf you want a specific feature or new roast added to Wombo bot')
    .addField('\u200b', '`?roastidea`\nuse this command to get a free insult to use')
    .addField('\u200b', '`?complimentidea`\nuse this command to get a free compliment to use')
    .addField('\u200b', '`?setnick`\ncan also be used to set or reset your own nickname (Your role needs to be below mine however)')
    .setThumbnail('https://i.ibb.co/D4m9fPg/general.png')
    .setColor(0x99ccff)
    receivedMessage.channel.send(embed);
}

function voice_help(receivedMessage){
    const embed = new Discord.MessageEmbed()
    .setTitle('Voicechat Commands')
    .addField('\u200b', '`?join`\nTo get Wombo bot to join the voicechat you are in')
    .addField('\u200b', '`?leave`\nTo get Wombo bot to disconnect from the voicechat you are in')
    .addField('\u200b', '`?play`\nWombo bot plays whatever song you want in your voicechat')
    .addField('\u200b', '`?skip`\nSkips to the next song in queue')
    .addField('\u200b', '`?queue`\nShows you the music queue')
    .addField('\u200b', '`?clear queue`\nWipes the music queue entirely')
    .addField('\u200b', '`?remove song`\nRemoves a specific song from the music queue')
    .addField('\u200b', '`Coming Soon`\nGoing to add permissions for the music commands, to limit abuse')
    .addField('\u200b', '\u200b')
    .setThumbnail('https://i.ibb.co/1ZngJtB/voice.png')
    .setColor(0x99ccff)
    receivedMessage.channel.send(embed);
}

module.exports = { staff_help, general_help, voice_help }