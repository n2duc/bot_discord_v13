const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, PermissionsBitField } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'ban',
    category: 'moderation',
    description: 'Cho đứa nào đó cút vĩnh viễn khỏi nơi đây',
    run: async (client, message, args) => {
        if (!args[0]) return message.reply("Vui lòng tag người nào đó để ban")

        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return message.reply('Bạn không có quyền ban người khác!');
        const toBan = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!toBan) return message.reply('Không tìm thấy người cần ban, vui lòng thử lại.');
        if (toBan.id == message.author.id) return message.reply('Bạn không thể ban chính mình!');

        if (message.member.roles.highest.position <= toBan.roles.highest.position) {
            return message.reply("Bạn không thể ban người có role bằng hoặc cao hơn mình !!")
        }
        if (message.guild.members.me.roles.highest.position <= toBan.roles.highest.position) {
            return message.reply("Tôi không thể ban người có role bằng hoặc cao hơn mình !!")
        }
        let reason = args.slice(1).join(' ');
        if (!args[1]) {
            reason = "Không có lý do."
        }

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setStyle(ButtonStyle.Danger)
                .setCustomId('kickyes')
                .setLabel('Yes'),
            new ButtonBuilder()
                .setStyle(ButtonStyle.Primary)
                .setCustomId('kickno')
                .setLabel('No')
        )

        let kickAskEmbed = new EmbedBuilder()
            .setColor("RED")
            .setDescription('**🛑 - Bạn thực sự muốn ban người này !**')

        let kickEmbed = new EmbedBuilder()
            .setColor('RED')
            .setTitle('🛑 Lệnh BAN')
            .setThumbnail(toBan.user.displayAvatarURL({dynamic: true}))
            .setDescription(`${toBan} (${toBan.id}) đã bị cho cút khỏi nơi này
            **- Người ban:** ${message.member} (${message.member.id})
            **- Lý do:** ${reason}`)
            .setTimestamp()
        let kickEmbed2 = new EmbedBuilder()
            .setColor('RED')
            .setDescription(`Đã hủy **ban** đối với ${toBan}!`)

        const kickPage = await message.reply({ embeds: [kickAskEmbed], components: [row]})
        const col = await kickPage.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: ms('10s')
        })
        
        try {
            col.on('collect', i => {
                if (i.user.id !== message.author.id) return
                if (i.customId === 'kickyes') {
                    toBan.ban({ reason })
                    kickPage.edit({ embeds: [kickEmbed], components: [] })
                } else if (i.customId === 'kickno') {
                    kickPage.edit({ embeds: [kickEmbed2], components: [] })
                }
            })
        } catch(err) {
            message.reply('Có lỗi khi Ban!')
            console.error(err)
        }
    },
};