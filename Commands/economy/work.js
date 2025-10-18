const { Client, Message, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'work',
    category: 'economy',
    cooldown: 120,
    description: 'Làm việc để nhận tiền.',
    run: async(client, message, args) => {
        const jobs = ['chơi phò', 'đi làm', 'đi học', 'ăn trộm', 'nhận học bổng', 'sóc lọ', 'hiếp dâm gái', 'thẩm du', 'hít cỏ'];

        const jobIndex = Math.floor(Math.random() * jobs.length);
        const coins = Math.floor(Math.random() * 100) + 1;

        message.channel.send(`Bạn vừa \**${jobs[jobIndex]}\** và nhận \`${coins}\` <:money:967037594879807550>.`);
        client.bank(message.author.id, coins);
    }
}