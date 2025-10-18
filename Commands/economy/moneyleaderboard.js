const { Client, Message, EmbedBuilder, Collection } = require('discord.js');

module.exports = {
    name: 'moneyleaderboard',
    aliases: ['moneyleaderboard', 'mlb', 'topcoins'],
    category: 'economy',
    description: 'Xem bảng xếp hạng PH Money',
    cooldown: 20,
    run: async(client, message, args) => {
        const collection = new Collection();

        await Promise.all(
            message.guild.members.cache.map(async(member) => {
                const id = member.id;
                const bal = await client.bal(id);
                return bal !== 0 ? collection.set(id, {
                    id,
                    bal,
                }) : null;
            })
        );
        const data = collection.sort((a, b) => b.bal - a.bal).first(10);
        let lb = await data.map((v, i) => {
            return `\`#${i+1}\`| ${client.users.cache.get(v.id).tag} - \**${v.bal}\** <:money:967037594879807550>`;
        })
        const embed = new EmbedBuilder()
            .setAuthor({ name: `Bảng xếp hạng PH Money - ${client.user.username}`, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setColor('#b9fbc0')
            .setDescription(lb.join("\n"))
            .setTimestamp()
            .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        message.channel.send({ embeds: [embed] })
    },
};