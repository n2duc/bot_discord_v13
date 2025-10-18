const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'random',
    description: 'Random number.',
    aliases: ['rand'],
    usage: '<number>',
    run: async(client, message, args) => {
        if (!args.length) {
            message.reply('Vui lòng nhập một con số, ví dụ: ~random 100')
        } else {
            let max = args[0]
            let randNo = Math.floor(Math.random() * max + 1)
            if (isNaN(max)) return message.channel.send('Phải là số cơ, bựa quá')
            const embed = new EmbedBuilder()
                .setColor('RED')
                .setDescription(`🎲 Số random của bạn: \**${randNo}\**`);
            message.channel.send({ embeds: [embed] })
        }
    }
}