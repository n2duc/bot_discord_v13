const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: "removerol",
    aliases: ["roleremove", "rr"],
    category: "moderation",
    description: "Xóa role",
    usage: "<tag> <rolename>",

    run: async(client, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!args[0]) return message.reply("Bạn phải tag ai đó")
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return message.reply("Bạn không có quyền `\ MANAGE_ROLES `\ ")
        if (!user) return message.reply("Không tìm thấy người bạn tag, vui lòng thử lại.")
        
        let search = args.slice(1).join(' ')
        const role = message.guild.roles.cache.find(r => r.name.includes(search))

        if (!role) return message.channel.send('Không tìm thấy role này!')

        user.roles.remove(role.id)
        message.channel.send(`${user} đã bị gỡ bỏ role ${role}`)
    }
}