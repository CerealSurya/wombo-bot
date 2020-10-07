
import Discord from 'discord.js';

export function staff_help(receivedMessage){

    const embed = new Discord.MessageEmbed()
    .setTitle('Staff Commands')
    .addField('`?ignore`', 'ignores whoever you mention, basically it means that I will ignore their commands to me (only one person at a time)')
    .addField('`?unignore`', 'it unignores whoever you mention (only one person at a time)')
    .addField('\u200b', '\u200b')
    .setThumbnail('https://i.ibb.co/dDxyxXf/staff.png')
    .setColor(0x99ccff)
    receivedMessage.author.send(embed);
    receivedMessage.reply("Just DM'd the commands");

}


export function general_help(receivedMessage){
    const embed = new Discord.MessageEmbed()
    .setTitle('General Commands')
    .addField('`?roast`', 'To get Wombo bot to roast someone')
    .addField('\u200b', '\u200b')
    .addField('`?ttsroast`', 'To roast someone in tts (beware tho, this is really annoying and could get you in trouble. Use wisely)')
    .addField('\u200b', '\u200b')
    .addField('`?compliment`', 'To get Wombo bot to compliment someone')
    .addField('\u200b', '\u200b')
    .addField('`?ttscompliment`', 'To compliment someone in tts (beware tho, this is really annoying and could get you in trouble. Use wisely)')
    .addField('\u200b', '\u200b')
    .addField('`?coinflip`', 'flip a coin')
    .addField('\u200b', '\u200b')
    .addField('`?request`', 'If you want a specific feature or new roast added to Wombo bot')
    .addField('\u200b', '\u200b')
    .addField('`?roastidea`', 'use this command to get a free insult to use')
    .addField('\u200b', '\u200b')
    .addField('`?complimentidea`', 'use this command to get a free compliment to use')
    .addField('\u200b', '\u200b')
    .setThumbnail('https://i.ibb.co/D4m9fPg/general.png')
    .setColor(0x99ccff)
    receivedMessage.author.send(embed);
    receivedMessage.reply("Just DM'd the commands");
}

export function voice_help(receivedMessage){
    const embed = new Discord.MessageEmbed()
    .setTitle('Voicechat Commands')
    .addField('`?join`', 'To get Wombo bot to join the voicechat you are in')
    .addField('\u200b', '\u200b')
    .addField('`?leave`', 'To get Wombo bot to disconnect from the voicechat you are in')
    .addField('\u200b', '\u200b')
    .addField('`?vcroast`', 'To get Wombo bot to roast someone in your voicechat')
    .addField('\u200b', '\u200b')
    .addField('`?vccompliment`', 'To get Wombo bot to compliment someone in your voicechat')
    .addField('\u200b', '\u200b')
    .addField('`?earrape`', 'Wombo bot joins your voicechat and plays really loud music (use wisely, this is a very annoying command) ')
    .addField('\u200b', '\u200b')
    .setThumbnail('https://i.ibb.co/1ZngJtB/voice.png')
    .setColor(0x99ccff)
    receivedMessage.author.send(embed);
    receivedMessage.reply("Just DM'd the commands");
}