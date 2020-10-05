
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

