const {resolve} = require('./staff_limiter.js');

function setnick(args, receivedMessage){ //sets the nickname of someone
    try{
        const prefixremove = String(receivedMessage.content.substring(9));
        var member = receivedMessage.mentions.members.first();
        let nick = prefixremove.substring(args[0].length).replace(/ /g,''); //removing the spaces in the message

        console.log(prefixremove);
        member.setNickname(nick); //setting the nickname
        if (nick == ''){ //if the nickname given is blank than we just reset the users nickname
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
async function createrole(args, receivedMessage, inside, name){ //creates a role
    if(args.length > 0 || inside != false){// checking if the user called this function or if I did inside the code
        try{
            if(inside == false && name == false){ //The user called this function
                const derolename = String(receivedMessage.content.substring(12)).replace(/ /g,'');
                receivedMessage.guild.roles.create({ data: {name: derolename} }) //creates the role
                receivedMessage.channel.send(`I have created the role *${derolename}*`);
            }
            else{// I called this function
                var member = inside;
                receivedMessage.guild.roles.create({ data: {name: name} }) //creates the role
                receivedMessage.channel.send('One second')
                    .then(message => message.delete({timeout: 3000})); 
                await resolve(1) //need to wait a second so that we can actually add the role 
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

function setrole(args, receivedMessage){ //sets the rol to someone 
    if(args.length > 0){

        const member = receivedMessage.mentions.members.first();
        const checking = String(receivedMessage.content.substring(9));
        let role_name = checking.substring(args[0].length).replace(/ /g,''); //gets the actual role name
        console.log(role_name);
        let role_check = receivedMessage.guild.roles.cache.find(x => x.name === role_name); //finds the role

        if (typeof role_check === 'object'){
            if(member.roles.cache.find(r => r.name === role_name) == undefined){ //if the member doesn't have the role than we add it to the member
                member.roles.add(role_check);
                receivedMessage.channel.send(`I have given the role *${role_name}* to **${member.user.username}**`)
            }
            else if(member.roles.cache.find(r => r.name === role_name) != undefined){ //they already have the role
                receivedMessage.channel.send(`**${member.user.username}** already has the role *${role_name}*`);
            }
        }
        else{
            receivedMessage.channel.send(`the role **${role_name}** does not exist, would you like me to create the role? | type 'yes' or 'no'`).then(() => {
                const filter = m => receivedMessage.author.id === m.author.id; //or if the role doesn't exist than we ask them if want to make it
                receivedMessage.channel.awaitMessages(filter, { time: 20000, max: 1, errors: ['time'] })
                    .then(messages => {
                        var da_content = String(messages.first().content); 
                        console.log(da_content);
                        if (da_content == 'yes'){
                            createrole(args, receivedMessage, member, role_name) //we make it sinced they said yes
                        };
                        if (da_content == 'no'){
                            return receivedMessage.channel.send('Oke I will not create the role'); //we don't create the role
                        }
                    }) 
                    .catch((err) => {
                        console.log(err);
                        receivedMessage.channel.send('Time is up, I am not going to create the role.'); //ran out of time
                    });
            });


        }
    }
    else{
        receivedMessage.channel.send('Your message should be formatted like this `?setrole @someone -insert role to give-`')
    }
}

module.exports = { setnick, createrole, setrole }