
//! This whole script is going to be implemented soon, too many bugs right now.
export function setnick(args, receivedMessage){ //TODO: Need to work on this, there is a bad error that happens when u try to set ur own nickanem
    try{
        let prefixremove = String(receivedMessage.content.substring(9));
        let member = receivedMessage.mentions.members.first();
        let nick = prefixremove.substring(args[0].length);

        console.log(prefixremove);
        member.setNickname(nick); 
        if (nick == ''){
            receivedMessage.channel.send(`reset the nickname`);
        }
        else{
            receivedMessage.channel.send(`changed the nickname to **${nick}**`);
        };
    }
    catch(err){
        receivedMessage.channel.send('```You need to put a @ mention before you put the nickname \n like this: ?setnick @ToxicWalter Badbot ```')
        console.log(err);
    };
};

export function blacklistcommand(args, receivedMessage){
    if (args.length > 0){
        try{
            const adrole = receivedMessage.guild.roles.cache.find( r => r.name === 'not-wombo'); //TODO: if the role is not there then it doesn't run the catch part
            const member = receivedMessage.mentions.members.first();                              //TODO: Get it so that the user that calls the command needs to have manage roles.
            member.roles.add(adrole)
            receivedMessage.channel.send(`Noted from now on I will ignore ${member}'s commands`)
        }
        catch(err){
            receivedMessage.channel.send('You need to create a role named "not-wombo" for this command to work')
        }
        
    }
    else{
        receivedMessage.channel.send("For me to ignore someones commands to me you need to @ them. Try ` ?blacklist [@urenemy]`,\nand make sure you have Manage_roles perms.");
        // .then(message => message.delete({timeout: 5000})); 
    };
};

//TODO: ALso add a vote to blacklist someone command