const { Client, Message, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'buakeobao',
    category: 'economy',
    aliases: ['bkb', 'oantuti', 'ott'],
    usage: '[bua/keo/bao]',
    cooldown: 10,
    descriptions: 'Chơi búa kéo bao với Bot',
    run (client, message, args) {
        // const member = message.mentions.members.first()|| message.guild.members.cache.get(args[0]) || message.member
        let choices = ['búa', 'kéo', 'bao']

        let botsChoice = choices[~~(Math.random() * choices.length)];

        let ket_qua = 'Hòa';
        if (!args[0] || args[0].match(/búa|kéo|bao|bua|keo/gi)) {
            if (botsChoice == 'búa' && args[0] == 'bao') {
                ket_qua = 'Bạn';
            } else if (botsChoice == 'búa' && args[0] == 'kéo' || args[0] == 'keo') {
                ket_qua = 'Bot';
            } else if (botsChoice == 'búa' && args[0] == 'búa' || args[0] == 'bua') {
                ket_qua = 'Hòa';
            }

            if (botsChoice == 'kéo' && args[0] == 'bao') {
                ket_qua = 'Bot';
            } else if (botsChoice == 'kéo' && args[0] == 'búa' || args[0] == 'bua') {
                ket_qua = 'Bạn';
            } else if (botsChoice == 'kéo' && args[0] == 'kéo' || args[0] == 'keo') {
                ket_qua = 'Hòa';
            }

            if (botsChoice == 'bao' && args[0] == 'búa' || args[0] == 'bua') {
                ket_qua = 'Bot';
            } else if (botsChoice == 'bao' && args[0] == 'kéo' || args[0] == 'keo') {
                ket_qua = 'Bạn';
            } else if (botsChoice == 'bao' && args[0] == 'bao') {
                ket_qua = 'Hòa';
            }
        }

        // console.log(ket_qua);
        let noti;
        if (ket_qua == 'Hòa') {
            noti = 'Hòa'
        } else {
            noti = `${ket_qua} dành chiến thắng.`
        }

        const coins = 1000;
        if(ket_qua == 'Bạn') {
            client.bank(message.author.id, coins)
        }

        const embed = new EmbedBuilder();

        
        embed.setAuthor({name: 'Chơi Búa/Kéo/Bao với Bot',iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})

        if (ket_qua == 'Hòa') {
            embed.setColor('YELLOW') 
            embed.addFields({name:`**Bựa quá:**`,value:`**Cũng khét đấy con gà này!**`});
        } else if (ket_qua == 'Bot') {
            embed.setColor('RED')
            embed.addFields({name: `**Bựa quá:**`,value: `**Thua cả con Bot đúng con gà!**`});
        } else if (ket_qua == 'Bạn'){
            embed.setColor('GREEN')
            embed.addFields({name: `**Bựa quá:**`,value: `**Lần này chấp thôi nhá con gà!**`});
        }
        embed.addFields(
            {name: `**Bạn chọn:**`, value: `\`${args[0]}\``, inline: true},
            {name: `**Bot chọn:**`, value: `\`${botsChoice}\``, inline: true},
            {name: `**Kết quả:**`, value: `\`${noti}\``, inline: true}
        )
        if(ket_qua == 'Bạn') {
            client.bank(message.author.id, coins)
            embed.addFields({ name: "Số tiền nhận được: ", value: `\`${coins}\` <:money:967037594879807550>`, inline: true})
        }

        embed.setTimestamp()
        embed.setFooter({text: message.member.displayName, iconURL: message.author.displayAvatarURL({ dynamic: true })})

        message.channel.send({embeds : [embed]})
    }
}