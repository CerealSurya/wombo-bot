
function resolve(x) { 
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 3000);
    });
}

var counter = 0;
const roleName = '_wombo-ignore_';
export async function blacklistcommand(args, receivedMessage, command){
    if (args.length > 0){
        let user = receivedMessage.author;
        let member = receivedMessage.guild.member(user);
        if (member.hasPermission('MANAGE_ROLES')) {
            console.log('This member can do the command');
            try{
                const member = receivedMessage.mentions.members.first();  
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
                    receivedMessage.channel.send(`Aight fine, I'll listen to ${member}'s from now on.`);
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

//TODO: ALso add a vote to blacklist someone command