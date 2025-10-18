const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'clear',
    description: 'Xóa số lượng tin nhắn',
    aliases: ['clean', 'xoa'],
    usage: '[prefix]clear <số lượng tin nhắn> || [tag]+<số lượng tin nhắn> ',
    category: 'moderation',

    run: async(client, message, args) => {
        await message.delete();

        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            const reply = await message.reply("Bạn không có quyền MANAGE_MESSAGES");
            setTimeout(() => reply.delete().catch(() => {}), 5000);
            return;
        }

        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            const reply = await message.reply("Bot không có quyền MANAGE_MESSAGES nên bot không thể xoá.");
            setTimeout(() => reply.delete().catch(() => {}), 5000);
            return;
        }

        const user = message.mentions.users.first()
        const ammount = !!parseInt(args[0]) ? parseInt(args[0]) : parseInt(args[1])
        if (!ammount) return message.reply('Vui lòng nhập số lượng tin nhắn để xoá.')
        if (ammount < 1) return message.reply('Vui lòng nhập số lớn hơn 1.')
        if (ammount > 100) return message.reply('Vui lòng nhập số nhỏ hơn 100.')
        if (!ammount && !user) return message.channel.send(`Sử dụng lệnh help clear\` để biết thêm thông tin.`)
        if (!user) {
            const delmsg = await message.channel.bulkDelete(ammount, true);
            const info = await message.channel.send(`Đã xoá \`${delmsg.size}\` tin nhắn!`);
            setTimeout(() => info.delete().catch(() => {}), 5000);
        } else {
            const messages = await message.channel.messages.fetch({
                limit: 100,
            });
            const raw = messages.filter(m => m.author.id === user.id).first(ammount);
            const toDelete = Array.isArray(raw) ? raw : raw ? [raw] : [];
            if (!toDelete.length) {
                const info = await message.channel.send('Không tìm thấy tin nhắn nào để xoá.');
                setTimeout(() => info.delete().catch(() => {}), 5000);
                return;
            }
            const deleted = await message.channel.bulkDelete(toDelete, true);
            const info = await message.channel.send(`Đã xoá \`${deleted.size}\` tin nhắn!`);
            setTimeout(() => info.delete().catch(() => {}), 5000);
        }
    },
};