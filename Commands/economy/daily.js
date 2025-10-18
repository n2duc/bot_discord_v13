const { Client, Message, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'daily',
    cooldown: 60 * 60 * 24,
    category: 'economy',
    description: 'Nhận tiền trợ cấp hằng ngày.',
    run: async(client, message, args) => {
        const coins = Math.floor(Math.random() * 3000) + 1;

        message.channel.send(`Bạn vừa nhận \`${coins}\` <:money:967037594879807550> trong ngày hôm nay!`);
        client.bank(message.author.id, coins);
    }
}