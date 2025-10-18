require('dotenv').config();
const {
    Client,
    Collection,
    GatewayIntentBits,
    Partials,
    EmbedBuilder
} = require('discord.js');
// const axios = require('axios');
// const fetch = require('node-fetch');
// const prefix = process.env.PREFIX
const TOKEN = process.env.TOKEN
const mongo = require('mongoose')
const schema = require('./schemas/schema')
const generateImage = require("./generateImage")


const ms = require('ms');
const guildInvites = new Map();

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel, Partials.Message],
    allowedMentions: { parse: ['users'] }
});


mongo.connect(process.env.MONGODB_SRV, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log(`Đã kết nối thành công với Database! ✅`)
}).catch( err => {
    console.log(err)
})

client.commands = new Collection();
client.interactions = new Collection();
client.aliases = new Collection();
client.categories = new Collection();
client.cooldowns = new Collection();

['command', 'event', 'slashCommand'].forEach(handler => require(`./handlers/${handler}`)(client));

client.snipes = new Map();
client.on('messageDelete', async function(message) {
    if (message.partial) {
        try {
            await message.fetch();
        } catch (err) {
            return;
        }
    }

    client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })
})

// Music Event
//Invite Create

client.on('ready', () => {
    client.guilds.cache.forEach(guild => {
        guild.invites.fetch()
            .then(invites => guildInvites.set(guild.id, invites))
            .catch(err => console.log(err));
    })
})

client.on('inviteCreate',  async( invites ) => {
    const channel = invites.guild.channels.cache.get('1018547855331426354');
    if (channel) {
        const embed = new EmbedBuilder()
            .setTitle(`Có link invite mới được tạo!`)
            .addFields(
                { name: 'Người tạo', value: invites.inviter.tag },
                { name: 'Số lượng', value: invites.maxUses === 0 ? "Không giới hạn" : String(invites.maxUses) },
                { name: 'Thời hạn của link', value: invites.maxAge === 0 ? "Không giới hạn" : ms(invites.maxAge, { long: true }) }
            )
            .setFooter({text: `ID: ${invites.inviter.id}`})
            .setTimestamp()
        channel.send({embeds: [embed]})
    }
    guildInvites.set(invites.guild.id, await invites.guild.invites.fetch())
});



client.esnipes = new Collection();
client.on('messageUpdate', async(oldMes, newMes) => {
    if (oldMes.partial) {
        try {
            await oldMes.fetch();
        } catch (err) {
            return;
        }
    }
    if (newMes.partial) {
        try {
            await newMes.fetch();
        } catch (err) {
            return;
        }
    }
    const esnipes = client.esnipes.get(oldMes.channel.id) || [];
    if (esnipes.length > 5) esnipes == esnipes.slice(0, 4)
    esnipes.unshift({
        msg: oldMes,
        newc: newMes,
        author: oldMes.author
    })
    client.esnipes.set(oldMes.channel.id, esnipes)
})


//ECONOMY SYSTEM
client.bal = (id) => new Promise(async ful => {
    const data = await schema.findOne({ id });
    if (!data) return ful(0);
    ful(data.coins);
})
client.bank = (id, coins) => {
    schema.findOne({ id }, async(err, data) => {
        if (err) throw err;
        if (data) {
            data.coins += coins;
        } else {
            data = new schema({ id, coins })
        }
        data.save();
    })
}
client.rmv = (id, coins) => {
    schema.findOne({ id }, async(err, data) => {
        if (err) throw err;
        if (data) {
            data.coins -= coins;
        } else {
            data = new schema({ id, coins: -coins })
        }
        data.save();
    })
}


//WELCOME IMAGE
const welcomeChannelId = "1018527427493904454"

client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `<@${member.id}> **Welcome to the server!**`,
        files: [img]
    })
})

client.login(TOKEN);
