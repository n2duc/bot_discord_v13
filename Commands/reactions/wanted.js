const { Canvas } = require('canvacord');
const { AttachmentBuilder } = require('discord.js')

module.exports = {
    name: "wanted",
    category: "reactions",
    description: "Poster truy nã nè cu :)",
    usage: "[@tag]",
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.author
        const avatar = user.displayAvatarURL({ dynamic: false, format: 'png' })
        const image = await Canvas.wanted(avatar)

        const attachment = new AttachmentBuilder(image, { name: "wanted.gif" })

        message.channel.send({ files: [attachment]})
    }
}