const { Client, GatewayIntentBits, EmbedBuilder, VoiceState, Collection, Guild, ChannelType, CategoryChannel, messageLink, } = require("discord.js")
const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates
    ]
})
const voiceCollection = new Collection();


client.on("ready", async () => {
    const HelpSlash = [{
        name: "help",
        description: "コマンド一覧"
    }];
    await client.application.commands.set(HelpSlash)
    console.log("logged")
});

client.on("interactionCreate", async (Interaction) => {
    if (!Interaction.isCommand()) {
        return;
    }
    if (Interaction.commandName === "help") {
        await Interaction.reply({content:"**`Prefix ┃ d/ ・ /`**\n```\n-general\nhelp```", ephemeral: true});
    }
});

client.on("voiceStateUpdate", async (oldState, newState) => {
    const user = await client.users.fetch(newState.id);
    const member = newState.guild.members.cache.get(user);

    if (!oldState.channel && newState.channel.id === "1059455463353225247") {
        const channel = await newState.guild.channels.create({
            name: user.tag,
            type: ChannelType.GuildVoice,
            parent: "1058006203759869992"
        })
        const name = await oldState.guild.channels.cache.get()
        newState.setChannel(channel) 
    } else if (oldState.channel.name === user.tag) {
        oldState.channel.delete()
    } 
});


client.login("MTA1Nzk1MDk4NzI1MzQ2OTIxNQ.GfGQ_p.mtkfRXnWXFyiNACnbszDIvSqMIgxIXU0tdgjPs"); 

