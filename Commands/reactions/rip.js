const { Canvas } = require('canvacord');
const { AttachmentBuilder } = require('discord.js')

module.exports = {
    name: "rip",
    category: "reactions",
    description: "Đắp mộ cuộc tình",
    usage: "[@tag]",
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.author
        const avatar = user.displayAvatarURL({ dynamic: false, format: 'png' })
        const image = await Canvas.rip(avatar)

        const attachment = new AttachmentBuilder(image, { name: "rip.gif" })

        message.channel.send({ files: [attachment]})
    }
}