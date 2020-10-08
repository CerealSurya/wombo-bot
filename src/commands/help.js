
import Discord from 'discord.js';


export function staff_help(receivedMessage){

    const embed = new Discord.MessageEmbed()
    .setTitle('Staff Commands')
    .addField('\u200b', '`?ignore`\nignores whoever you mention, basically it means that I will ignore their commands to me (only one person at a time)')
    .addField('\u200b', '`?unignore`\nit unignores whoever you mention (only one person at a time)')
    .setThumbnail('https://i.ibb.co/dDxyxXf/staff.png')
    .setColor(0x99ccff)
    receivedMessage.author.send(embed);
    receivedMessage.reply("Just DM'd the commands");

}


export function general_help(receivedMessage){
    const embed = new Discord.MessageEmbed()
    .setTitle('General Commands')
    .addField('\u200b','`?roast`\nTo get Wombo bot to roast someone\n ')

    .addField('\u200b', '`?ttsroast`\nTo roast someone in tts (beware tho, this is really annoying and could get you in trouble. Use wisely)')
    
    .addField('\u200b', '`?compliment`\nTo get Wombo bot to compliment someone')
    
    .addField('\u200b', '`?ttscompliment`\nTo compliment someone in tts (beware tho, this is really annoying and could get you in trouble. Use wisely)')
    
    .addField('\u200b', '`?coinflip`\nflip a coin')
    
    .addField('\u200b', '`?request`\nIf you want a specific feature or new roast added to Wombo bot')
    
    .addField('\u200b', '`?roastidea`\nuse this command to get a free insult to use')
    
    .addField('\u200b', '`?complimentidea`use this command to get a free compliment to use')
    
    .setThumbnail('https://i.ibb.co/D4m9fPg/general.png')
    .setColor(0x99ccff)
    receivedMessage.author.send(embed);
    receivedMessage.reply("Just DM'd the commands");
}

export function voice_help(receivedMessage){
    const embed = new Discord.MessageEmbed()
    .setTitle('Voicechat Commands')
    .addField('\u200b', '`?join`\nTo get Wombo bot to join the voicechat you are in')

    .addField('\u200b', '`?leave`\nTo get Wombo bot to disconnect from the voicechat you are in')
 
    .addField('\u200b', '`?vcroast`\nTo get Wombo bot to roast someone in your voicechat')

    .addField('\u200b', '`?vccompliment`\nTo get Wombo bot to compliment someone in your voicechat')

    .addField('\u200b', '`?earrape`\nWombo bot joins your voicechat and plays really loud music (use wisely, this is a very annoying command) ')

    .setThumbnail('https://i.ibb.co/1ZngJtB/voice.png')
    .setColor(0x99ccff)
    receivedMessage.author.send(embed);
    receivedMessage.reply("Just DM'd the commands");
}