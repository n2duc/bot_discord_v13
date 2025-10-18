const fetch = require('node-fetch')
const ms = require('ms')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
module.exports = {
    name: 'timeout',
    aliases: ['tm', 'mute'],
    description: 'Giới hạn/Cấm người nào đó trong một khoảng thời gian',
    usage: '[prefix]<user> <time [d|m|h|s]>',
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        let member = message.mentions.members.first() ||
            message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.find((m) => m.user.username === args[0]) || message.guild.members.cache.find((m) => m.user.id === args[0]);
        let content = args.slice(1).join(" ")
        if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return message.channel.send('**Bạn không có quyền để thực hiện lệnh này !! Bựa**')
        else if (member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('**Bạn không thể timeout người có \`ROLE\` cao hơn bạn !! Bựa**')
        else {
            if (!member) return message.channel.send('**Vui lòng tag một ai để để timeout !!**')
            if (!content) return message.channel.send('**Cung cấp thời gian hoặc đặt nó thành \`Off\` để loại bỏ timeout.**')
            if (content.toLowerCase() === 'off') {
                fetch(`https://discord.com/api/v9/guilds/${message.guild.id}/members/${member.id}`, {
                    method: 'PATCH',
                    headers: { "Authorization": "Bot " + client.token, "Content-Type": "application/json" },
                    body: JSON.stringify({ 'communication_disabled_until': null }),
                }).then(m => {
                    return message.channel.send(`**Đã xóa timeout ${member.user.tag}**`)
                })
            }
            let ggg = ['d', "m", "h", "s"];
            if (ggg.some(c => content.endsWith(c))) {
                const timee = ms(content)
                if (timee <= 9999) return message.channel.send('**Bạn không thể timeout một người nào đó dưới 10 giây !!**')
                if (timee > 2332800000) return message.channel.send('**Bạn không thể timeout một người nào đó lớn hơn 27 ngày !!**.')
                let time = new Date().getTime()
                let newdate = new Date(time + timee).toISOString()

                fetch(`https://discord.com/api/v9/guilds/${message.guild.id}/members/${member.id}`, {
                    method: 'PATCH',
                    headers: { "Authorization": "Bot " + client.token, "Content-Type": "application/json" },
                    body: JSON.stringify({ 'communication_disabled_until': `${newdate}` }),
                }).then(m => {
                    message.channel.send({ embeds:
                                            [new EmbedBuilder()
                                                .setTitle(`Set timeout`)
                                                .setDescription(`**User:** ${member.user.tag}\n**Bởi:** ${message.author.tag}\n**Time:** ${ms(timee)}`)
                                                .setColor('RED')
                                                .setFooter({text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 1024 })})
                                            ] 
                                        })
                })
            }
        }
    },
};