const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'github',
    category: 'info',
    aliases: ['gh'],
    usage: '[tên tài khoản]',
    descriptions: 'Hiển thị thông tin tài khoản Github',
    run: async (client, message, args) => {
        if (!args.length) {
            return message.reply('Vui lòng cung cấp tên tài khoản GitHub cần tìm.');
        }

        const username = args[0];
        const searchingEmbed = new EmbedBuilder()
            .setColor('Green')
            .setAuthor({
                name: 'Đang tìm kiếm, vui lòng đợi...',
                iconURL: client.user.displayAvatarURL({ size: 256 })
            });

        const statusMessage = await message.channel.send({ embeds: [searchingEmbed] });

        try {
            const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);

            if (!response.ok) {
                const errorEmbed = new EmbedBuilder()
                    .setColor('Red')
                    .setDescription(response.status === 404
                        ? `Không tìm thấy tài khoản GitHub với tên \`${username}\`.`
                        : 'Không thể truy cập dữ liệu từ GitHub lúc này.');

                return statusMessage.edit({ embeds: [errorEmbed] });
            }

            const data = await response.json();

            const infoEmbed = new EmbedBuilder()
                .setColor('Green')
                .setAuthor({
                    name: data.name || data.login,
                    iconURL: data.avatar_url,
                    url: data.html_url
                })
                .setTitle('Thông tin tài khoản GitHub')
                .setURL(data.html_url)
                .setThumbnail(data.avatar_url)
                .addFields(
                    { name: 'Tên người dùng', value: `\`${data.login}\``, inline: true },
                    { name: 'Tên hiển thị', value: `\`${data.name || 'Không có'}\``, inline: true },
                    { name: 'ID', value: `\`${data.id}\``, inline: true }
                )
                .addFields(
                    { name: 'Loại tài khoản', value: `\`${data.type}\``, inline: true },
                    { name: 'Tổ chức/Công ty', value: `\`${data.company || 'Không có'}\``, inline: true },
                    { name: 'Địa điểm', value: `\`${data.location || 'Không rõ'}\``, inline: true }
                )
                .addFields(
                    { name: 'Email', value: `\`${data.email || 'Không công khai'}\``, inline: true },
                    { name: 'Blog', value: data.blog ? `[Liên kết](${data.blog})` : 'Không có', inline: true },
                    { name: 'Bio', value: data.bio ? data.bio : 'Không có', inline: false }
                )
                .addFields(
                    { name: 'Public repos', value: `\`${data.public_repos}\``, inline: true },
                    { name: 'Followers', value: `\`${data.followers}\``, inline: true },
                    { name: 'Đang theo dõi', value: `\`${data.following}\``, inline: true }
                )
                .addFields({
                    name: 'Tham gia từ',
                    value: `\`${new Date(data.created_at).toLocaleDateString('vi-VN')}\``,
                    inline: true
                })
                .setTimestamp();

            return statusMessage.edit({ embeds: [infoEmbed] });
        } catch (error) {
            const errorEmbed = new EmbedBuilder()
                .setColor('Red')
                .setDescription('Có lỗi xảy ra trong quá trình tìm kiếm. Vui lòng thử lại sau.');

            return statusMessage.edit({ embeds: [errorEmbed] });
        }
    }
};
