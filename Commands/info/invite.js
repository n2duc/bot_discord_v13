const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");
module.exports = {
    name: 'invite',
    aliases: ['invite', 'inv'],
    category: 'info',
    description: 'Xem thông tin và mời BOT vào server của bạn.',

    run: async(client, message) => {

        const embed = new EmbedBuilder()
            .setColor("BLUE")
            .setTimestamp()
            .setThumbnail(client.user.displayAvatarURL())
            .setAuthor({ name: `Bot tập sự - ${client.user.username}`, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setFooter({ text: message.guild.name, iconURL: message.author.avatarURL({ dynamic: true }) })
            .setDescription(`✨Một sản phẩm của **CUDAH**✨
            **
            > Servers: \`${client.guilds.cache.size}\`
            > Members: \`${Math.ceil(client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString("tr-TR"))}\`
            > Channels: \`${client.channels.cache.size}\`**`)
            .addFields({name: "Mời Bot vào server của bạn:", value: `**[Add Me](https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=8&scope=bot)**`, inline: true})
        message.channel.send({ embeds: [embed] });

    }
}