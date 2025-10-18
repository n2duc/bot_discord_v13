const {EmbedBuilder} = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'github',
    category: 'info',
    aliases: ['gh'],
    usage: '[tên tài khoản]',
    descriptions: 'Hiển thị thông tin tài khoản Github',
    run: async (client, message, args) => {
        let searchEmbed = new EmbedBuilder()
        .setColor('GREEN')
        .setAuthor({name:'Đang tìm kiếm, vui lòng đợi...', iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
        let searching = await message.channel.send({embeds: [searchEmbed]})
        const url = await fetch(`https://api.github.com/users/${encodeURIComponent(args.join(' '))}`)
        const data = await url.json()
        .then(data=> {

            const noData = new EmbedBuilder()
            .setColor('RED')
            .setDescription(`Có lỗi xảy ra trong quá trình tìm!`)
            if(!data) return searching.edit({embeds : [noData]})

            const imageEmbed = new EmbedBuilder()
            .setColor('GREEN')
            .setTitle(`Github Infomation \`${data.name}\``)
            .addFields(
                { name: "**Tên Github:**", value: `\`${data.login}\``, inline: true},
                { name: "**Tên:**", value: `\`${data.login}\``, inline: true},
                { name: "**ID:**", value: `\`${data.id}\``, inline: true}
            )
            .addFields(
                { name: "**Tài khoản:**", value:`\`${data.type}\``, inline: true},
                { name: "**Địa điểm:**", value: `\`${data.location}\``, inline: true},
                { name: "**Email:**", value: `\`${data.email}\``, inline: true}
            )
            .addFields(
                { name: "**Bio:**", value:`\`${data.bio}\``, inline: true},
                { name: "**Số Repo mở:**", value:`\`${data.public_repos}\``, inline: true},
                { name: "**Người theo dõi:**", value:`\`${data.followers}\``, inline: true},
            )
            .addFields(
                { name: "**Đang theo dõi::**", value:`\`${data.following}\``, inline: true},
                { name: "**Tham gia:**", value: `\`${data.created_at}\``, inline: true}
            )
            .setThumbnail(data.avatar_url)
            .setTimestamp()
            .setFooter({text: message.member.displayName, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            
            return searching.edit({ embeds: [imageEmbed] })
        })
    }
}