const { EmbedBuilder, parseEmoji } = require('discord.js')
const { parse } = require("twemoji-parser")

module.exports = {
    name: 'enlarge',
    description: "Phóng to emoji",
    aliases: ['emo', 'emoji'],
    category: 'info',

    run: async(client, message, args) => {
        const emoji = args[0]
        if(!emoji) return message.channel.send("Nhập emoji !!")

        let custom = parseEmoji(emoji)

        const embed = new EmbedBuilder()
            .setTitle(`Phiên bản phóng to của Emoji: ${emoji}`)
            .setColor("AQUA")

        if(custom.id) {
            let link = `https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`;
            embed.setImage(link)
                .setFooter({text: `Emoji ID: ${custom.id}`})
            return message.channel.send({embeds: [embed]})
        } else {
            let parsed = parse(emoji, { assetType: 'png' })
            if(!parsed[0]) {
                return message.channel.send("Emoji không hợp lệ!")
            } 
            embed.setImage(parsed[0].url)

            return message.channel.send({embeds: [embed]})
        }
    }
}