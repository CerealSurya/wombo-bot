
function resolve(x) { 
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 3000);
    });
}

var counter = 0;
const roleName = '_wombo-ignore_';
var check_sum = false;
export async function blacklistcommand(args, receivedMessage, command, vote){
    if (args.length > 0){
        if (vote == 'no'){
            let user = receivedMessage.author;
            var member = receivedMessage.guild.member(user);
        }
        else{
            check_sum = true;
            var member = vote;
        }

        if (member.hasPermission('MANAGE_ROLES') || check_sum ) {
            console.log('This member can do the command');
            try{
                if (vote == 'no'){
                    var member = receivedMessage.mentions.members.first();  
                }
                else {
                    var member = vote
                }
                let role = receivedMessage.guild.roles.cache.find(x => x.name === roleName); 

                if (member.roles.cache.find(r => r.name === roleName) != undefined && command == 'blacklist' ){
                    return receivedMessage.channel.send(`I am already ignoring ${member}`); 
                }
                else if(member.roles.cache.find(r => r.name === roleName) == undefined && command == 'unblacklist' ){
                    return receivedMessage.channel.send(`I have already stopped ignoring ${member}`);
                }
                if (typeof role === 'undefined') {
                    if (command === 'blacklist'){ 
                        receivedMessage.guild.roles.create({ data: {name: roleName} })
                        receivedMessage.channel.send('One second')
                            .then(message => message.delete({timeout: 3000}));
                        await resolve(1)
                        role = receivedMessage.guild.roles.cache.find(x => x.name === roleName);
                        console.log('firsts');
                        member.roles.add(role);
                    }
                    else if(command === 'unblacklist'){
                        counter = 1;
                        receivedMessage.channel.send("For me to uningnore someone I have to be ignoring them first. do '?help' for more info");
                    }
                } else {
                    if (command === 'blacklist'){
                        console.log('seconds');
                        member.roles.add(role);
                    }
                    else if(command === 'unblacklist'){
                        await member.roles.remove(role);
                        counter = 0;
                    }
                }
                if (command === 'blacklist'){
                    receivedMessage.channel.send(`Noted from now on I will ignore ${member}'s commands`);
                }
                else if(command === 'unblacklist' && counter == 0){
                    receivedMessage.channel.send(`Aight fine, I'll listen to ${member}'s commands from now on.`);
                };
            }
            catch(err){
                receivedMessage.channel.send('You need to mention someone for this command to work.');
                console.log(err);
                }
            }
        else{
            receivedMessage.channel.send('Dum dum, you need Manage roles perms for this to work. \nIf you want you can vote to ignore someone using the ?voteignore command')
        } 
    }
    else{
        receivedMessage.channel.send("For me to ignore someones commands to me you need to @ them. Try ` ?ignore [@urenemy]`,\nand make sure you have Manage_roles perms.");
        // .then(message => message.delete({timeout: 5000})); 
    };
};
export {roleName};

export async function voteblacklist(args, receivedMessage){
    if (args.length > 0){
        const member = receivedMessage.mentions.members.first();
        let counter = 1;
        let message_counter = false;
        function private_listen(args, receivedMessage){
            receivedMessage.channel.send(`ignore vote ${member.user.username} ${counter}/5\n(type ?yes to vote yes | type ?no to vote no) `).then(() => {
                const filter = m => receivedMessage.author.id != m.author.id; 
                receivedMessage.channel.awaitMessages(filter, { time: 20000, max: 1, errors: ['time'] })
                    .then(messages => {
                        var da_content = String(messages.first().content); 
                        console.log(da_content);
                        if (da_content == '?yes'){
                            counter++;
                            if (counter >= 5){
                                return blacklistcommand(args, receivedMessage, 'blacklist', member);
                            }
                            else{
                                private_listen(args, receivedMessage);
                            };
                        };
                        if (da_content == '?no'){
                            counter = 1;
                            return receivedMessage.channel.send(`one person has declined. **${member.user.username}** you are safe for now.\n(the vote needs to be unanimous)`);
                        }
                    }) 
                    .catch((err) => {
                        console.log(err);
                        receivedMessage.channel.send(`Vote has failed **${member.user.username}** is safe for now `);
                    });
                

            });
        }
        private_listen(args, receivedMessage);

    }
    else{
        receivedMessage.channel.send('Aye bro you gotta mention someone like `?voteignore @someone`')
    }
}

//TODO: ALso add a vote to blacklist someone command