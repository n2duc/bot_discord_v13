const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'ping',
    category: 'info',
    aliases: ['ping', 'p', 'uptime', 'stats'],
    description: 'Xem độ trễ của bot',
    run: async(client, message) => {
        const { version } = require("discord.js");
        const ping = Math.round(client.ws.ping)
        const uptime = client.uptime
        let days = Math.floor(uptime / 86400000)
        let hours = Math.floor(uptime / 3600000) % 24
        let minutes = Math.floor(uptime / 60000) % 60
        let seconds = Math.floor(uptime / 1000) % 60

        const embed = new EmbedBuilder()
            .setTitle(`Thông tin khác của \`${client.user.username}\``)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setColor('BLURPLE')
            .addFields(
                {name:'🏓 Ping', value: `┕\`${ping} ms\``, inline: true},
                {name: '⏰ Uptime', value: `┕\`${days}d, ${hours}h, ${minutes}m, ${seconds}s\``, inline: true},
                {name: '📘 Discord.JS', value: `┕\`v${version}\``, inline: true}
            )
        message.channel.send({embeds: [embed]})
    }
}