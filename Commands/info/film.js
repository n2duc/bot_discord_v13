const { EmbedBuilder } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'film',
    category: 'info',
    descriptions: 'Thông tin về một bộ phim',
    aliases: ['phim'],
    usage: '<Tên bộ phim>', 

    run: async(client, message, args) => {
        const searchEmbed = new EmbedBuilder()
        .setColor('GREEN')
        .setAuthor({name:'Đang tìm kiếm, vui lòng đợi...', iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
        let searching = await message.channel.send({embeds: [searchEmbed]})
        const url = await fetch(`https://api.popcat.xyz/imdb?q=${encodeURIComponent(args.join(' '))}`)
        const data = await url.json()

        const res = await fetch(`https://api.popcat.xyz/translate?to=vi&text=${data.plot}`)
        const data1 = await res.json()
            const noData = new EmbedBuilder()
            .setColor('RED')
            .setDescription(`Có lỗi xảy ra trong quá trình tìm!`)
            if(!data) return searching.edit({embeds : [noData]})

            const embed = new EmbedBuilder()
            .setColor('GREEN')
            .setDescription(` Thông tin về bộ phim **${data.title}**`)

            .addFields(
                { name: "**Tên phim**", value: `\`${data.name}\``, inline: true },
                { name: "**Thể loại**", value: `\`${data.genres}\``, inline: true },
                { name: "**Độ dài**", value: `\`${data.runtime}\``, inline: true }
            )
            .addFields(
                { name: "**Năm phát hành**", value: `\`${data.year}\``, inline: true },
                { name: "**Giám đốc**", value: `\`${data.director}\``, inline: true },
                { name: "**Nhà văn**", value: `\`${data.writer}\``, inline: true }
            )
            .addFields(
                { name: "**Diễn viên**", value: `\`${data.actors}\``, inline: true },
                { name: "**Đánh giá**", value: `\`${data.rating}\``, inline: true },
                { name: "**Doanh thu**", value: `\`${data.boxoffice}\``, inline: true }
            )
            .addFields(
                { name: `**Series**`, value: `\`${data.series ? "Có✅" : "Không⛔"}\``, inline: true },
                { name: `**Thêm thông tin**`, value: `[Link](${data.imdburl})`, inline: true }
            )
            .addFields({ name: "**Giới thiệu**", value: `${data1.translated}`})

            .setImage(data.poster)

            return searching.edit({embeds: [embed]})
    }
}