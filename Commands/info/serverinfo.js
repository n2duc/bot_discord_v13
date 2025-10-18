const { EmbedBuilder, ChannelType } = require('discord.js');
const moment = require('moment')

module.exports = {
  
  name: "serverinfo",
  category: "info",
  permissions: ["SEND_MESSAGES"],
  aliases: ["serverinfo", "server"],
  usage: "[prefix]serverinfo",
  description: "Hiển thị thông tin của server",  

  run: async (client, message, args) => {
    try {
      

    const channels = message.guild.channels.cache;
    const owner = await message.guild.fetchOwner().then(m => m.user).catch(() => null)
    let guild = message.guild;
    let embed = new EmbedBuilder()
      .setAuthor({ name: `Thông tin server: ${message.guild.name}`, iconURL: message.guild.iconURL()})
      .setThumbnail(message.guild.iconURL())
      .setColor(`#48cae4`)
      .addFields(
        {
          name: `📢 **Tên Server**`,
          value: `**${message.guild.name}**`,
          inline: true
        },
        { 
          name: `👑 **Owner**`,
          value: owner ? `${owner}\n\`${owner.tag}\`` : "Không xác định",
          inline: true
        },
        {
          name: `🆔 **Server ID**`,
          value: `\`${message.guild.id}\``,
          inline: true
        },
        )
        .addFields(
        {
          name: `📅 **Tạo vào ngày**`,
          value: `${moment.utc(message.guild.createdAt).format('LLLL')}`,
          inline: true
        },
        {
        name: `💏 **Thành viên**`,
        value: `**${message.guild.memberCount}** members (**${message.guild.members.cache.filter(member => !member.user.bot).size}** User | **${message.guild.members.cache.filter(member => member.user.bot).size}** Bot)`,
        inline: true
        },
        {
          name: `🖥 **Channels**`,
          value: `Tổng: **${channels.size}** (**${channels.filter(channel => channel.type === ChannelType.GuildText).size}** text | **${channels.filter(channel => channel.type === ChannelType.GuildVoice).size}** voice)`,
          inline: true
        },
        )
        
        .addFields(
          {
            name: `💠 **Boost**`,
            value: `**${message.guild.premiumSubscriptionCount}** boost`,
            inline: true
          },
          {
            name: `🤣 **Emoji**`,
            value: `**${guild.emojis.cache.size}** (Thường: **${guild.emojis.cache.filter((e) => !e.animated).size}** | Động: **${guild.emojis.cache.filter((e) => e.animated).size}**)`,
            inline: true
          },
          {
            name: `🎨 **Sticker**`,
            value: `**${guild.stickers.cache.size}** stickers`,
            inline: true
          }
        )

        .addFields(
        {
          name: `🔰 **Verification level**`,
          value: `${message.guild.verificationLevel}`,
          inline: true
        },
        {
          name: `🌎 **Locale**`,
          value: `**${message.guild.preferredLocale}** `,
          inline: true
        },
        {
          name: `🔗 **Roles**`,
          value: `**[${guild.roles.cache.size}]** roles`,
          inline: true
        }
      )

      message.channel.send({ embeds: [embed] })

        } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.reply({embeds: [new EmbedBuilder()
            .setColor("RED")
            .setTitle(`❌ ERROR`)
            .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
        ]});
    }
  }
}