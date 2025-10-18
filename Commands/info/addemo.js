const { parseEmoji, PermissionsBitField } = require('discord.js')

module.exports = {
    name: 'addemo',
    description: 'Thêm emmo vào server.',
    usage: '<addemo>',
    category: 'info',
    run: async(client, message, args) => {
        if (!args.length) return message.channel.send('Vui lòng để emoji nào đó vào để thêm vào server!')

        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuildExpressions)) {
            return message.channel.send('Bạn không có quyền thêm emoji.');
        }

        for (const emojis of args) {
            const getEmoji = parseEmoji(emojis);

            if (getEmoji.id) {
                const emojiExt = getEmoji.animated ? 'gif' : 'png';
                const emojiURL = `https://cdn.discordapp.com/emojis/${getEmoji.id}.${emojiExt}`;
                message.guild.emojis.create({ attachment: emojiURL, name: getEmoji.name }).then(emoji =>
                    message.channel.send(`Đã thêm emoji ${emoji.name} vào \`${message.guild.name}\``)).catch(() =>
                        message.channel.send('Không thể thêm emoji này.'))
            }
        }
    }
}