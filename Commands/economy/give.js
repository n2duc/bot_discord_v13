const { Client, Message, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'give',
    cooldown: 20,
    usage: '<số tiền> <Tag người nhận>',
    category: 'economy',
    description: 'Chuyển tiền cho người khác.',
    run: async(client, message, args) => {
        const user = message.mentions.users.first();
        if (!user) return message.reply('Vui lòng tag ai đó!')

        const coinsToGive = args[1];
        if (!coinsToGive) return message.reply('Vui lòng nhập số tiền để gửi!!');
        if (coinsToGive >= 1000000) return message.reply("❌ | Số tiền gửi không được nhiều hơn **1 củ** (hay \`jack/5\`) !!")

        if (isNaN(coinsToGive))
            return message.reply('Tiền bằng số')

        const convertedGive = parseInt(coinsToGive);
        if (await client.bal(message.author.id) < convertedGive) return message.reply('Bạn không đủ tiền để chuyển. Lêu lêu')

        await client.rmv(message.author.id, convertedGive);
        await client.bank(user.id, convertedGive);
        const embed = new EmbedBuilder()
            .setTitle('CHUYỂN TIỀN')
            .setColor('#b9fbc0')
            .setDescription(`✅\**${message.author}\** vửa gửi \**${convertedGive}\** <:money:967037594879807550> cho ${user}`)
            .setTimestamp()
            .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
        message.channel.send({ embeds: [embed] });
    }
}