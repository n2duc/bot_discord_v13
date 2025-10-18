const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'say',
    category: 'fun',
    description: 'Chat bằng bot',
    aliases: ['say'],
    run: async(client, message, args) => {
        let msg;
        let textchannel = message.mentions.channels.first()

        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.reply({ content: '**Bạn không có quyền sử dụng lệnh này**' })
        } else if (!args[0]) {
            return message.reply({ content: '**Ghi vài chữ mới được chứ địt mẹ ?**' })
        } else if (textchannel) {
            message.delete()
            msg = args.slice(1).join(' ');
            client.channels.cache.get(textchannel.id).send({ content: msg })
        } else {
            message.delete()
            msg = args.join(' ');
            message.channel.send({ content: msg })
        }
    }
}