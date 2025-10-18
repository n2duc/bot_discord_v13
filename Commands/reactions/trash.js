const { Canvas } = require('canvacord');
const { AttachmentBuilder } = require('discord.js')

module.exports = {
    name: "trash",
    category: "reactions",
    description: "Rác trong ánh mắt kẻ si tình",
    usage: "[@tag]",
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.author
        const avatar = user.displayAvatarURL({ dynamic: false, format: 'png' })
        const image = await Canvas.trash(avatar)

        const attachment = new AttachmentBuilder(image, { name: "trash.gif" })

        message.channel.send({ files: [attachment]})
    }
}