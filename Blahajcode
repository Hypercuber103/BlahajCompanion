require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel]
});

// List of rotating statuses
const statuses = [
    { name: 'the ocean 🌊 | !help', type: 3 }, // Watching
    { name: 'shark documentaries 🦈📺', type: 3 }, // Watching
    { name: 'ocean waves 🌊🎶', type: 2 }, // Listening
    { name: 'Shark Simulator 2024 🎮', type: 0 }, // Playing
    { name: 'Blåhaj Adventures! 🦈✨', type: 0 } // Playing
];

// Function to update bot status every 60 seconds
function updateStatus() {
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setPresence({ activities: [randomStatus], status: 'online' });
}

// Bot Ready Event
client.once('ready', () => {
    console.log(`🦈 Blåhaj is online as ${client.user.tag}!`);

    // Set initial status
    updateStatus();

    // Change status every 2 minutes
    setInterval(updateStatus, 120000);
});

// Command descriptions
const commands = {
    '!help': 'Displays this help message. 📃',
    '!sharkfact': 'Get a random shark or Blåhaj fact. 🤔',
    '!hug': 'Receive a warm (or rare sassy) Blåhaj hug. 🤗',
    '!blahajdance': 'Watch Blåhaj show off some epic dance moves! 🕺🦈',
    '!joke': 'Hear a shark-themed joke from Blåhaj. 🤣',
    '!pridelevel': 'Check your pride level! 🏳️‍🌈💙',
    'I love blahaj': 'Tell Blåhaj you love them and get some love back! 💙',
    'I hate blahaj': 'Tell Blåhaj you hate them and get a sassy reply! 💙'
};

// Message Event Listener
client.on('messageCreate', (message) => {
    if (message.author.bot || !message.guild) return;

    // "I love blahaj" Response
    if (message.content.toLowerCase() === 'i love blahaj') {
        message.reply(`I love you too 💙, ${message.author}!`);
        return;
    }

    // "I hate blahaj" Response
    if (message.content.toLowerCase() === 'i hate blahaj') {
        message.reply(`Oh no! That hurts... 💔 But I hate you more 😼, ${message.author}!`);
        return;
    }

    // "!sharkfact" Command
    if (message.content.toLowerCase() === '!sharkfact') {
        const facts = [
            'Sharks have been around for over 400 million years!',
            'They have multiple rows of teeth and can regrow thousands in their lifetime.',
            'There are over 500 species of sharks, from tiny dwarf sharks to massive whale sharks!',
            'Sharks can detect electrical fields and vibrations in the water, making them expert hunters.',
            'Blåhaj (pronounced "Blaw-high") means "blue shark" in Swedish!',
            'Blåhaj is a whopping 39 inches long, making it the perfect snuggle buddy. 💙',
            'Blåhaj thrives on sofas, beds, and desks worldwide!',
            'IKEA uses sustainable materials for Blåhaj, making it eco-friendly. 🌱',
            'Fans love documenting Blåhaj\'s "adventures," from traveling to starring in memes!'
        ];
        message.reply(facts[Math.floor(Math.random() * facts.length)]);
    }

    // "!hug" Command
    if (message.content.toLowerCase() === '!hug') {
        const isRare = Math.random() < 0.10; // 10% chance for rare response
        if (isRare) {
            message.reply('No, I’m too busy swimming. 🦈💨');
            return;
        }

        const hugReplies = [
            `Blåhaj hugs you warmly! 🦈💙`,
            `Here’s a big Blåhaj hug just for you! 🤗🦈`,
            `You're amazing! Blåhaj sends you a comforting hug! 🦈💙`,
            `Blåhaj wraps their fins around you in a snug hug! 🦈✨`,
            `Sending virtual shark snuggles your way! 🦈💙`
        ];
        message.reply(hugReplies[Math.floor(Math.random() * hugReplies.length)]);
    }

    // "!blahajdance" Command
    if (message.content.toLowerCase() === '!blahajdance') {
        const danceMoves = [
            '🦈💃 Blåhaj is doing the shark dance!',
            '🦈🕺 Watch Blåhaj shake it with style!',
            '🦈✨ Blåhaj is spinning in circles of joy!',
            '🦈🎶 Blåhaj is grooving to the beat!',
            '🦈🦈 Double the sharks, double the dance moves!'
        ];
        message.reply(danceMoves[Math.floor(Math.random() * danceMoves.length)]);
    }

    // "!joke" Command
    if (message.content.toLowerCase() === '!joke') {
        const jokes = [
            "Why don't sharks like fast food? Because they can't catch it! 🦈😂",
            "What’s a shark’s favorite sci-fi show? Shark Trek! 🖖🦈",
            "How do sharks stay in shape? They swim-ercise! 🏊‍♂️🦈",
            "What do you call a shark who delivers toys at Christmas? Santa Jaws! 🎅🦈",
            "Why was the shark good at math? It was great with angles! 📐🦈",
            "What’s a Blåhaj’s favorite hobby? Sofa surfing! 🛋️🦈"
        ];
        message.reply(jokes[Math.floor(Math.random() * jokes.length)]);
    }

    // "!pridelevel" Command
    if (message.content.toLowerCase() === '!pridelevel') {
        const prideLevels = [
            "🏳️‍🌈 So fabulous it hurts! 🌟",
            "🏳️‍⚧️ Living your best queer life! ✨",
            "💜 Certified rainbow royalty!",
            "💙 The ultimate LGBTQ+ ally!",
            "❤️ Rainbow energy detected at MAXIMUM levels!"
        ];

        // Generate random pride score
        const prideScore = Math.floor(Math.random() * 101); // 0-100%
        const randomResponse = prideLevels[Math.floor(Math.random() * prideLevels.length)];

        // Send the result
        message.reply(`${message.author}, your Pride Level: **${prideScore}%** ${randomResponse}`);
    }

    // "!help" Command
    if (message.content.toLowerCase() === '!help') {
        const helpMessage = Object.entries(commands)
            .map(([command, description]) => `**${command}** - ${description}`)
            .join('\n');
        message.reply(`🦈 **Blåhaj Commands** 🦈\n${helpMessage}`);
    }
});

// Login to Discord
client.login(process.env.DISCORD_TOKEN);
