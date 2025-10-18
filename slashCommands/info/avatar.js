const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Lấy avatar của bạn hoặc người khác',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'user',
            description: 'Người bạn muốn lấy avatar',
            type: ApplicationCommandOptionType.User,
            required: false,
        }
    ],
    run: async (client, interaction) => {
        const user = interaction.options.getUser('user') || interaction.user;
        const avatarURL = user.displayAvatarURL({ format: 'png', size: 4096, dynamic: true });
        const embed = new EmbedBuilder()
            .setImage(avatarURL)
            .setTitle(`Avatar của ${user.tag}`);
        interaction.reply({ embeds: [embed] });
    },
};
