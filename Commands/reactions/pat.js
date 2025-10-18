const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'pat',
    category: 'reactions',
    aliases: ['xoadau'],
    usage: '[prefix]pat [tag/id người dùng]',
    descriptions: 'Dành một cái xoa dầu cho người khác',
    run: async (client, message, args) => {
        const member = message.mentions.members.first()|| message.guild.members.cache.get(args[0]) || message.member
        if(member.id === message.author.id) return message.reply ("Bạn có thể xoa đầu chính mình... ở ngoài đời");
        let robber = message.author;
        
        let searchEmbed = new EmbedBuilder()
            .setColor('GREEN')
            .setAuthor({name: 'Đợi xíu nha, đừng có mà bựa ...', iconURL: `${client.user.displayAvatarURL({ size: 1024, dynamic: true })}`})
        let searching = await message.channel.send({embeds: [searchEmbed]})

        const url = await fetch(`https://nekos.life/api/v2/img/pat`)
        const data = await url.json()
        .then(data=> {

            const noData = new EmbedBuilder()
            .setColor('RED')
            .setDescription(`Có lỗi xảy ra trong quá trình tìm ảnh!`)
            if(!data) return searching.edit({embeds : [noData]})


            const imageEmbed = new EmbedBuilder()
            .setColor('GREEN')
            .setAuthor({name: 'Reaction: Pat', iconURL: `${client.user.displayAvatarURL({ size: 1024, dynamic: true })}`})
            .setDescription(`${message.member.displayName} đã dành một cái xoa đầu cho ${member.displayName}`)
            .setImage(data.url)
            
            return searching.edit({embeds: [imageEmbed]})
        })
    }
}