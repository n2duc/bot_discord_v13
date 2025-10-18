const { EmbedBuilder } = require("discord.js")

module.exports = {
  name: "first-message",
  aliases: ['fm'],
  description: "Xem tin nhắn đầu tiên ở Channel",
  usage: '{prefix}fm',
  category: "fun",
  run: async (client, message, args) => {
    const fetchmessages = await message.channel.messages.fetch({ limit: 1, after: 1 })
    const msg = fetchmessages.first()

    const embed = new EmbedBuilder()
      .setDescription(`
      **Nội dung:** \`${msg.content}\`
      **Gửi bởi:** ${msg.author}
      **Ngày gửi:** <t:${parseInt(msg.createdTimestamp / 1000)}:R>
      **URL:** [Nhấn vào để đến tin nhắn](${msg.url})
      `)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setColor('RANDOM')
      .setTimestamp()
    message.reply({ embeds: [embed] })
  },
};