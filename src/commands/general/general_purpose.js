

const roasts = [" ||You’re the reason God created the middle finger.|| ", "If your brain was dynamite, there wouldn’t be enough to blow your hat off. ", "You are more disappointing than an unsalted pretzel. ",
" Light travels faster than sound which is why you seemed bright until you spoke. ", "You are so annoying, that your Happy Meal crys hearing you. ", " You have so many gaps in your teeth it looks like your tongue is in jail. ",
" Your secrets are always safe with me. I never even listen when you tell me them ", " I’ll never forget the first time we met. But I’ll keep trying. ",
"Mirrors can't talk lucky for you they can't laugh either. ", "You're the reason the gene pool needs a lifeguard. ",
"If I had a face like yours I'd sue my parents. ", "If laughter is the best medicine then your face must be curing the world. ",
"When I see your face where is not a thing I would change, except for the direction I am walking in. ",
"If I had a dollar every time you said something smart I would be broke. ", "I love what you’ve done with your hair. How do you get it to come out of your nostrils like that? ", "OH MY GOD! IT SPEAKS! ", 
" Don’t worry about me. Worry about your eyebrows. ", "I thought of you today. It reminded me to take out the trash. ", "You bring everyone so much joy, when you leave the room. ", "it looks like your face caught on fire and someone tried to put it out with a hammer.",
"Normally people live and learn, you just live.", "You must have been born on a highway, because thats where most accidents happen", "I was going to give you a nasty look, but you already have one.",
"Im glad to see your not letting your education get in the way of your ignorance.", "Your so ugly that when your mom dropped you off to school, she got a fine for littering.", "Hey, where'd you get those clothes, the toilet store?", "Your like a cloud, when you disapear its a beautiful day.", "If I wanted to end my life, I would jump off your ego and onto your IQ.", 
"I don't know what is worse, your IQ, or your hairline.", "Im jealous of all the people that haven't met you.", "Your really fat, and Im not going to sugarcoat it, because you are going to eat that too.",
"The last time I saw something like you, I flushed it.", "You are proof that god has a sense of humor.", "You're as sharp as a marble.", "I would challenge you to a battle of wits, but you seem unarmed.",
"Of course I talk like an idiot, how else would you be able to understand me?", "||Roses are red, Violets are blue, I got five fingers the middle one is for you||", "I hear you were born on April 2, a day too late",
"Did you fall from Heaven? Because it looks like you landed on your face.", "Two wrongs don't make a right, take your parents for example.", "There is no vaccine for stupidity", "- ugly and stupid, no I am not insulting you, I am describing you",
"Sorry sarcasm falls out of my mouth, like stupidity comes out of yours.", "stop calling yourself hot, the only thing you can turn on is the microwave", "I was going to give you a nasty look, but I see you already have one",
"Beep. Beep. BEEP. BEEP, I am detecting a lot of stupidity coming from your direction.", " ur so fat you make nicado avocado look skinny"
]

const compliments = [" You’re that “Nothing” when people ask me what I’m thinking about. ", "You look great today.", " You’re a smart cookie.", "I bet you make babies smile.", "You have impeccable manners.",
"I like your style.", "You have the best laugh.", "I appreciate you.", "You are the most perfect you there is.", "Our system of inside jokes is so advanced that only you and I get it. And I like that.",
"You’re strong.", "Your perspective is refreshing.", "You’re an awesome friend.", "You light up the room.", "You deserve a hug right now.", "You should be proud of yourself.",
"You’re more helpful than you realize.", "You have a great sense of humor.", "You’ve got all the right moves! ", "Is that your picture next to “charming” in the dictionary?",
"Is there anything you can’t do!?", "I always learn so much when I’m around you.", " You’re the person that everyone wants on their team.", "You are the epitome of a good person.",
"You have the best ideas.", " You’re incredibly thoughtful.", "On a scale of one to ten, you’re an eleven.", " You are a ray of sunshine.", "You’re a constant reminder that people can be good."
]

const numberofroasts = roasts.length +1;
const numberofcompliments = compliments.length +1;



function roastcommand(args, receivedMessage) {
    if (args.length > 0) {
        var randnumber = (Math.floor(Math.random() * numberofroasts));
        receivedMessage.channel.send(args + roasts[randnumber]);
        console.log((Math.floor(Math.random() * numberofroasts)));

        
   
        
    }
    else{
        receivedMessage.channel.send("You need to @ someone that you want to roast. Try ` ?roast [@urfriend]`");
    }
};

function compliment(args,receivedMessage){
    if (args.length > 0) {
        receivedMessage.channel.send(args + compliments[(Math.floor(Math.random() * numberofcompliments))]);
        console.log((Math.floor(Math.random() * numberofcompliments)));
    } else {
        receivedMessage.channel.send("You need to @ someone that you want to compliment them . Try `?compliment [@urfriend]`");
    }
};


function roastidea(args, receivedMessage){
    receivedMessage.author.send('Heres one - '+args + roasts[(Math.floor(Math.random() * numberofroasts))]);
    console.log((Math.floor(Math.random() * numberofroasts)));
};

function complimentidea(args, receivedMessage){
    receivedMessage.author.send('Heres one - '+args + compliments[(Math.floor(Math.random() * numberofcompliments))]);
    console.log((Math.floor(Math.random() * numberofcompliments)));
};

function coinflip(args, receivedMessage){
    var z = Math.floor(Math.random() * 10000000000);
    var x = Math.floor(Math.random() * 1000);
    console.log(x);
    z = z % 2; 
    console.log(z);

    if (z == 0){
        if(x < 300){
            receivedMessage.channel.send("Heads");
        }
        else if(x > 300 && x < 1000){
            receivedMessage.channel.send("Tails");
        };
    }
    else if(z == 1){
        if(x < 700){
            receivedMessage.channel.send("Heads");
        }
        else if(x > 700 && x < 1000){
            receivedMessage.channel.send("Tails");
        };
    }

}

module.exports = { roasts, compliments, roastcommand, compliment, roastidea, complimentidea, coinflip }