const { Client, Message, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'cash',
    aliases: ['bal'],
    category: 'economy',
    description: 'Xem số tiền của mình đang hiện có.',
    run: async(client, message, args) => {
        const member = message.mentions.members.first() || message.member;

        const bal = await client.bal(message.member.id);
        const embed = new EmbedBuilder()
            .setTitle('Tiền của bạn:')
            .setColor('#b9fbc0')
            .setDescription(`\**${member.displayName}\** đang có **${bal}** <:money:967037594879807550>`)

        message.channel.send({ embeds: [embed] });
    }
}