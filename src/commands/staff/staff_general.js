const {resolve} = require('./staff_limiter.js');

function setnick(args, receivedMessage){ 
    try{
        const prefixremove = String(receivedMessage.content.substring(9));
        var member = receivedMessage.mentions.members.first();
        let nick = prefixremove.substring(args[0].length).replace(/ /g,'');

        console.log(prefixremove);
        member.setNickname(nick); 
        if (nick == ''){
            receivedMessage.channel.send(`reset **${member.user.username}'s** nickname`);
        }
        else{
            receivedMessage.channel.send(`changed **${member.user.username}'s** nickname to **${nick}**`);
        };
    }
    catch(err){
        receivedMessage.channel.send('```You need to put a @ mention before you put the nickname \n like this: ?setnick @Wombo Badbot ```')
        console.log(err);
    };
};
async function createrole(args, receivedMessage, inside, name){
    if(args.length > 0 || inside != false){// checking if the user called this function or if I did inside the code
        try{
            if(inside == false && name == false){ //The user called this function
                const derolename = String(receivedMessage.content.substring(12)).replace(/ /g,'');
                receivedMessage.guild.roles.create({ data: {name: derolename} })
                receivedMessage.channel.send(`I have created the role *${derolename}*`);
            }
            else{// I called this function
                var member = inside;
                receivedMessage.guild.roles.create({ data: {name: name} })
                receivedMessage.channel.send('One second')
                    .then(message => message.delete({timeout: 3000}));
                await resolve(1)
                var role = receivedMessage.guild.roles.cache.find(x => x.name === name);
                receivedMessage.channel.send(`Okay I have given the role *${name}* to **${member.user.username}**\n**Note:** the role I have created does not have any permissions`);
                member.roles.add(role);
            }
        }
        catch(err){
            console.log(err);
            receivedMessage.channel.send('Whoops something went wrong, use the ?request command to report this error and how to reproduce it to my creator');
        };
    }
    else{
        receivedMessage.channel.send('I do not understand your message it should be formatted like this |\n`?createrole -rolename-`')
    }
}

function setrole(args, receivedMessage){
    if(args.length > 0){

        const member = receivedMessage.mentions.members.first();
        const checking = String(receivedMessage.content.substring(9));
        let role_name = checking.substring(args[0].length).replace(/ /g,'');
        console.log(role_name);
        let role_check = receivedMessage.guild.roles.cache.find(x => x.name === role_name);

        if (typeof role_check === 'object'){
            if(member.roles.cache.find(r => r.name === role_name) == undefined){
                member.roles.add(role_check);
                receivedMessage.channel.send(`I have given the role *${role_name}* to **${member.user.username}**`)
            }
            else if(member.roles.cache.find(r => r.name === role_name) != undefined){
                receivedMessage.channel.send(`**${member.user.username}** already has the role *${role_name}*`);
            }
        }
        else{
            receivedMessage.channel.send(`the role **${role_name}** does not exist, would you like me to create the role? | type 'yes' or 'no'`).then(() => {
                const filter = m => receivedMessage.author.id === m.author.id; 
                receivedMessage.channel.awaitMessages(filter, { time: 20000, max: 1, errors: ['time'] })
                    .then(messages => {
                        var da_content = String(messages.first().content); 
                        console.log(da_content);
                        if (da_content == 'yes'){
                            createrole(args, receivedMessage, member, role_name)
                        };
                        if (da_content == 'no'){
                            return receivedMessage.channel.send('Oke I will not create the role');
                        }
                    }) 
                    .catch((err) => {
                        console.log(err);
                        receivedMessage.channel.send('Time is up, I am not going to create the role.');
                    });
            });


        }
    }
    else{
        receivedMessage.channel.send('Your message should be formatted like this `?setrole @someone -insert role to give-`')
    }
}

module.exports = { setnick, createrole, setrole }