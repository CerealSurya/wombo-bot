

function resolve(x) { 
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 3000); //promise to have an await
    });
}

var counter = 0;
const roleName = '_wombo-ignore_';
const rolewhite = '_wombo-allow_'; //role names for blacklist and whitelist
var check_sum = false;
async function blacklistcommand(args, receivedMessage, command, vote){
    if (args.length > 0){
        if (vote == 'no'){
            let user = receivedMessage.author;
            var member = receivedMessage.guild.member(user); //if a sender runs it
        }
        else{
            check_sum = true; //if I ran the command
            var member = vote;
        }

        if (member.hasPermission('MANAGE_ROLES') || check_sum ) { //check the correct perms
            console.log('This member can do the command');
            try{
                if (vote == 'no'){
                    var member = receivedMessage.mentions.members.first();  //gets the first mention
                }
                else {
                    var member = vote //gets the person that started the voteblacklist
                }
                let role = receivedMessage.guild.roles.cache.find(x => x.name === roleName); 

                if (member.roles.cache.find(r => r.name === roleName) != undefined && command == 'blacklist' ){
                    return receivedMessage.channel.send(`I am already ignoring **${member.user.username}**`); 
                }
                else if(member.roles.cache.find(r => r.name === roleName) == undefined && command == 'unblacklist' ){
                    return receivedMessage.channel.send(`I have already stopped ignoring**${member.user.username}**`);
                }
                if (typeof role === 'undefined') {
                    if (command === 'blacklist'){ 
                        receivedMessage.guild.roles.create({ data: {name: roleName} })
                        receivedMessage.channel.send('One second')
                            .then(message => message.delete({timeout: 3000}));
                        await resolve(1)
                        role = receivedMessage.guild.roles.cache.find(x => x.name === roleName);
                        console.log('firsts'); //blacklist them
                        member.roles.add(role);
                    }
                    else if(command === 'unblacklist'){
                        counter = 1; //when we are not ignonring them
                        receivedMessage.channel.send("For me to uningnore someone I have to be ignoring them first. do '?help' for more info");
                    }
                } else {
                    if (command === 'blacklist'){ //if the role is already there than we just add it to the person
                        console.log('seconds');
                        member.roles.add(role);
                    }
                    else if(command === 'unblacklist'){
                        await member.roles.remove(role); //or just remove it if we unblacklisting
                        counter = 0;
                    }
                }
                if (command === 'blacklist'){
                    receivedMessage.channel.send(`Noted from now on I will ignore **${member.user.username}**'s commands`);
                }
                else if(command === 'unblacklist' && counter == 0){
                    receivedMessage.channel.send(`Aight fine, I'll listen to **${member.user.username}**'s commands from now on.`);
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


function voteblacklist(args, receivedMessage){
    if (args.length > 0){ //if there was an @
        const member = receivedMessage.mentions.members.first();
        let counter = 1;
        let message_counter = false;
        function private_listen(args, receivedMessage){
            receivedMessage.channel.send(`ignore vote ${member.user.username} ${counter}/5\n(type ?yes to vote yes | type ?no to vote no) `).then(() => {
                const filter = m => receivedMessage.author.id != m.author.id;  //starts the vote, the sender can't be the one that startedit
                receivedMessage.channel.awaitMessages(filter, { time: 20000, max: 1, errors: ['time'] })
                    .then(messages => {
                        var da_content = String(messages.first().content); 
                        console.log(da_content);
                        if (da_content == '?yes'){
                            counter++;
                            if (counter >= 5){
                                return blacklistcommand(args, receivedMessage, 'blacklist', member); //if the vote was succesful, run the blacklist command
                            }
                            else{
                                private_listen(args, receivedMessage); //loops the command if we don't have any votes
                            };
                        };
                        if (da_content == '?no'){
                            counter = 1; //person declines
                            return receivedMessage.channel.send(`one person has declined. **${member.user.username}** you are safe for now.\n(the vote needs to be unanimous)`);
                        }
                    }) 
                    .catch((err) => {
                        console.log(err);
                        receivedMessage.channel.send(`Vote has failed **${member.user.username}** is safe for now `);
                    });
            });
        }
        private_listen(args, receivedMessage); //gotta start the function

    }
    else{
        receivedMessage.channel.send('Aye bro you gotta mention someone like `?voteignore @someone`')
    }
}

module.exports = { resolve, blacklistcommand, roleName, rolewhite, voteblacklist }