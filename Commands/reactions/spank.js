const { Canvas } = require('canvacord');
const { AttachmentBuilder } = require('discord.js')

module.exports = {
    name: "spank",
    category: "reactions",
    description: "Tét mông thần chưởng",
    usage: "[@tag]",
    run: async (client, message, args) => {
        const author = message.author.displayAvatarURL({ dynamic: false, format: 'png'})
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.member
        
        if (!user) return message.channel.send("Vui lòng tag ai đó để vỗ mong")

        const avatar = user.displayAvatarURL({ dynamic: false, format: 'png' })
        const image = await Canvas.spank(author, avatar)

        const attachment = new AttachmentBuilder(image, { name: "spank.gif" })

        message.channel.send({ files: [attachment]})
    }
}