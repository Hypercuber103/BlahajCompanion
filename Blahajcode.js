require('dotenv').config();
const { Client, GatewayIntentBits, Partials, REST, Routes, SlashCommandBuilder, ActivityType, EmbedBuilder, PermissionsBitField } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration
    ],
    partials: [Partials.Channel]
});

// Slash commands list
const slashCommands = [
    new SlashCommandBuilder().setName('help').setDescription('Shows all commands 📃'),
    new SlashCommandBuilder().setName('sharkfact').setDescription('Get a random shark or Blåhaj fact 🦈'),
    new SlashCommandBuilder().setName('hug').setDescription('Receive a warm Blåhaj hug 🤗'),
    new SlashCommandBuilder().setName('blahajdance').setDescription('Watch Blåhaj show off dance moves! 🕺'),
    new SlashCommandBuilder().setName('joke').setDescription('Hear a shark-themed joke 🤣'),
    new SlashCommandBuilder().setName('pridelevel').setDescription('Check your pride level! 🏳️‍🌈'),
    new SlashCommandBuilder().setName('clear').setDescription('Deletes the last 10 messages (Admins only) 🧹')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages)
].map(cmd => cmd.toJSON());

// Register slash commands
client.once('ready', async () => {
    console.log(`🦈 Blåhaj is online as ${client.user.tag}!`);
    
    updateStatus();
    setInterval(updateStatus, 60000);

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    try {
        await rest.put(Routes.applicationCommands(client.user.id), { body: slashCommands });
        console.log('✅ Successfully registered slash commands!');
    } catch (error) {
        console.error('❌ Error registering commands:', error);
    }
});

// !help command
client.on('messageCreate', async message => {
    if (message.author.bot) return;

    if (message.content === '!help') {
        await message.reply('👋 Hey! I use **slash commands** now! If you have the old version of the bot, use [this link!](https://discord.com/oauth2/authorize?client_id=1330213308753510470&permissions=277092886592&integration_type=0&scope=bot+applications.commands) Then after you added the bot to your server, type `/help` to see a list of available commands.');
    }
});

// Rotating Status Function
const statuses = [
    { name: 'the ocean 🌊 | /help', type: ActivityType.Watching },
    { name: 'shark documentaries 🦈📺', type: ActivityType.Watching },
    { name: 'ocean waves 🌊🎶', type: ActivityType.Listening },
    { name: 'Shark Simulator 2024 🎮', type: ActivityType.Playing },
    { name: 'Blåhaj Adventures! 🦈✨', type: ActivityType.Playing }
];

function updateStatus() {
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setPresence({ activities: [randomStatus], status: 'online' });
}

// Handle Slash Commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    try {
        const { commandName } = interaction;

        if (commandName === 'help') {
            const helpEmbed = new EmbedBuilder()
                .setColor('#1E90FF')
                .setTitle('🦈 Blåhaj Commands')
                .setDescription('Here are the commands you can use:')
                .addFields(
                    { name: '/sharkfact', value: '🦈 Get a random shark fact', inline: true },
                    { name: '/hug', value: '🤗 Receive a hug', inline: true },
                    { name: '/blahajdance', value: '🕺 Dance with Blåhaj', inline: true },
                    { name: '/joke', value: '🤣 Hear a joke', inline: true },
                    { name: '/pridelevel', value: '🏳️‍🌈 Check your pride level', inline: true },
                    { name: '/clear', value: '🧹 Deletes last 10 messages (Admins only)', inline: true }
                )
                .setFooter({ text: 'Blåhaj loves you! 💙' });

            await interaction.reply({ embeds: [helpEmbed] });
        } else if (commandName === 'sharkfact') {
            const facts = [
                'Sharks have been around for over 400 million years!',
                'Sharks can detect electrical fields in the water.',
                'Blåhaj means "blue shark" in Swedish!',
                'Blåhaj is a soft and cuddly IKEA shark!',
                'There are over 500 species of sharks!',
                'Sharks lose and regrow thousands of teeth in their lifetime!'
            ];
            await interaction.reply(facts[Math.floor(Math.random() * facts.length)]);
        } else if (commandName === 'hug') {
            await interaction.reply('Blåhaj gives you a big hug! 🦈💙');
        } else if (commandName === 'blahajdance') {
            const dances = [
                '🦈💃 Blåhaj twirls gracefully!',
                '🦈🕺 Blåhaj does a little shark shuffle!',
                '🦈✨ Blåhaj performs the moonwalk (underwater edition)!',
                '🦈🎶 Blåhaj grooves to the rhythm of the ocean!',
                '🦈🤩 Blåhaj breaks into an epic dance routine!',
                '🦈💃🕺 Blåhaj joins in for a group dance party!'
            ];
            await interaction.reply(dances[Math.floor(Math.random() * dances.length)]);
        } else if (commandName === 'joke') {
            const jokes = [
                "Why don't sharks like fast food? Because they can't catch it! 🦈😂",
                "What’s a shark’s favorite sci-fi show? Shark Trek! 🖖🦈",
                "How do sharks stay in shape? They swim-ercise! 🏊‍♂️🦈",
                "What do you call a shark who delivers toys at Christmas? Santa Jaws! 🎅🦈",
                "Why was the shark good at math? It was great with angles! 📐🦈",
                "What’s a Blåhaj’s favorite hobby? Sofa surfing! 🛋️🦈"
            ];
            await interaction.reply(jokes[Math.floor(Math.random() * jokes.length)]);
        } else if (commandName === 'pridelevel') {
            const prideScore = Math.floor(Math.random() * 101);
            await interaction.reply(`${interaction.user}, your Pride Level: **${prideScore}%** 🏳️‍🌈`);
        } else if (commandName === 'clear') {
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
                return await interaction.reply({ content: '❌ You need **Manage Messages** permission to use this!', ephemeral: true });
            }

            const channel = interaction.channel;
            await channel.bulkDelete(10, true).catch(() => {});
            await interaction.reply({ content: '🧹 Deleted the last 10 messages!', ephemeral: true });
        }
    } catch (error) {
        console.error('Command error:', error);
        await interaction.reply({ content: '⚠️ Oops! Something went wrong.', ephemeral: true });
    }
});

// Login to Discord
client.login(process.env.DISCORD_TOKEN);
