const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: "kiss",
    category: 'reactions',
    aliases: ['hon', 'hun', 'kiss', 'bumom'],
    usage: '[prefix]kiss [tag/id người dùng]',
    descriptions: 'Bú mồm online qua Discord',

    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member

        if(member.id === message.author.id) {
            return message.channel.send('Bạn không thể tự bú mồm mình =)) !')
        }

        let robber = message.author;
        let searchEmbed = new EmbedBuilder()
            .setColor("BLURPLE")
            .setAuthor({name: 'Đợi xíu nha, đừng có mà bựa ...', iconURL: `${client.user.displayAvatarURL({ size: 1024, dynamic: true })}`})
        
        let searching = await message.channel.send({embeds: [searchEmbed]})

        const url = await fetch(`https://nekos.life/api/v2/img/kiss`)
        const data = await url.json().then(data => {
            const noData = new EmbedBuilder()
                .setColor('BLURPLE')
                .setDescription(`Có lỗi xảy ra trong quá trình tìm ảnh`)
            
            if(!data) {
                return searching.edit({embeds: [noData]})
            }

            const imageEmbed = new EmbedBuilder()
                .setColor("GREEN")
                .setAuthor({name: 'Reaction: Kiss', iconURL: `${client.user.displayAvatarURL({ size: 1024, dynamic: true })}`})
                .setDescription(`${message.member.displayName} đã bú mồm của ${member.displayName}`)
                .setImage(data.url)

            return searching.edit({embeds: [imageEmbed]})
        })
    }
}