const { Canvas } = require('canvacord');
const { AttachmentBuilder } = require('discord.js')

module.exports = {
    name: "gay",
    category: "reactions",
    description: "7 màu be like =))) như BTS",
    usage: "[@tag]",
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.author
        const avatar = user.displayAvatarURL({ dynamic: false, format: 'png' })
        const image = await Canvas.rainbow(avatar)

        const attachment = new AttachmentBuilder(image, { name: "gay.gif" })

        message.channel.send({ files: [attachment]})
    }
}