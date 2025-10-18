const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'hug',
    category: 'reactions',
    aliases: ['om'],
    usage: '[prefix]hug [tag/id người dùng]',
    descriptions: 'Dành một cái ôm cho người khác',
    run: async (client, message, args) => {
        const member = message.mentions.members.first()|| message.guild.members.cache.get(args[0]) || message.member
        if(member.id === message.author.id) return message.reply ("Ôm chính mình không khác gì tự buscu");
        let robber = message.author;
        let searchEmbed = new EmbedBuilder()
            .setColor('GREEN')
            .setAuthor({name: 'Đợi xíu nha, đừng có mà bựa ...', iconURL: `${client.user.displayAvatarURL({ size: 1024, dynamic: true })}`})
        let searching = await message.channel.send({embeds: [searchEmbed]})

        const url = await fetch(`https://nekos.life/api/v2/img/hug`)
        const data = await url.json()
        .then(data=> {
            //không trả về thì gửi về embed lỗi
            const noData = new EmbedBuilder()
            .setColor('RED')
            .setDescription(`Có lỗi xảy ra trong quá trình tìm ảnh!`)
            if(!data) return searching.edit({embeds : [noData]})

            //nếu có thì trả về ảnh
            const imageEmbed = new EmbedBuilder()
            .setColor('GREEN')
            .setAuthor({name: 'Reaction: Hug', iconURL: `${client.user.displayAvatarURL({ size: 1024, dynamic: true })}`})
            .setDescription(`${message.member.displayName} đã dành một cái ôm cho ${member.displayName}`)
            .setImage(data.url)
            
            return searching.edit({embeds: [imageEmbed]})
        })
    }
}