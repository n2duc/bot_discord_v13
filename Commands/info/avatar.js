const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'avatar',
    category: 'info',
    description: 'Xem Avatar của bạn hoặc của ai đó',
    aliases: ['avatar', 'ava', 'avt'],
    cooldown: 5,
    run: async(client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const avatarURL = member.displayAvatarURL({ format: 'png', size: 4096, dynamic: true });
        const embed = new EmbedBuilder()
            .setImage(avatarURL)
            .setTimestamp()
            .setURL(avatarURL)
            .setColor("GREEN")
            .setTitle(`Tải Avatar ${member.displayName}: `)
            .setFooter({ text: `Yêu cầu bởi ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        message.channel.send({ embeds: [embed] });
    }
}