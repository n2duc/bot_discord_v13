const { EmbedBuilder } = require('discord.js')
let stringSimilarity = require('string-similarity')

module.exports = {
    name: 'roleinfo',
    category: 'info',
    description: 'Xem thông tin của role (Quyền hạn, màu, số lượng, ..)',

    run: async(client, message, args) => {
        let roles = message.guild.roles.cache.filter(r => r.managed === false).map(g => g.name)
        var search = args.join('')
        var matches = stringSimilarity.findBestMatch(search, roles)
        var find = matches.bestMatch.target
        var role = message.guild.roles.cache.find(role => role.name === find)
        
        if (!isNaN(args[0])) {
            var role = message.guild.roles.cache.get(args[0])
        }
        const permissions = role.permissions.toArray().map((p) => `\`${p}\``).join(' ')
        let membersWithRole = message.guild.roles.cache.get(role.id).members
        const embed = new EmbedBuilder()
            .setColor(role.color)
            .setTitle("Thông tin về Role")
            .addFields(
                { name: "ID:", value: `${role.id}`, inline: true},
                { name: "Tên Role:", value: `${role.name}`, inline: true},
                { name: "Màu:", value: `${role.hexColor}`, inline: true}
            )
            .addFields(
                { name: "Vị trí:", value: `${role.position}`, inline: true},
                { name: "Số lượng:", value: `${membersWithRole.size}`, inline: true},
                { name: "Hoist:", value: `${role.hoist}`, inline: true},
            )
            .addFields(
                { name: "Mentionable:", value: `${role.mentionable}`, inline: true}
            )
            .setDescription(`**Permissions:** ${permissions || 'None'}`)
        message.channel.send({embeds: [embed]})
    }
}