
function resolve(x) { 
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 3000);
    });
  }
const roleName = '_wombo-ignore_';
export async function blacklistcommand(args, receivedMessage){
    if (args.length > 0){
        let user = receivedMessage.author;
        let member = receivedMessage.guild.member(user);
        if (member.hasPermission('MANAGE_ROLES')) {
            console.log('This member can do the command');
        try{
            const member = receivedMessage.mentions.members.first();  
            let role = receivedMessage.guild.roles.cache.find(x => x.name === roleName); 

            if (typeof role === 'undefined') {
                receivedMessage.guild.roles.create({ data: {name: roleName} })
                receivedMessage.channel.send('One second')
                    .then(message => message.delete({timeout: 3000}));
                await resolve(1)
                role = receivedMessage.guild.roles.cache.find(x => x.name === roleName);
                console.log('firsts');
                member.roles.add(role);
            } else {
                console.log('seconds');
                // role = receivedMessage.guild.roles.cache.find(x => x.name === roleName); 
                member.roles.add(role);
            }

            receivedMessage.channel.send(`Noted from now on I will ignore ${member}'s commands`);
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