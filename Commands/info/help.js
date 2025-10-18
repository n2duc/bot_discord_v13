const { EmbedBuilder } = require("discord.js");
const fs = require("fs");

require('dotenv').config();
const prefix = process.env.PREFIX;

module.exports = {
        name: "help",
        aliases: ['h'],
        category: 'info',
        description: 'Hiển thị tất cả các lệnh bot có sẵn.',
        run: async(client, message, args) => {

                if (!args[0]) {
                    let categories = [];

                    fs.readdirSync("./Commands/").forEach(dir => {
                        const commands = fs.readdirSync(`./Commands/${dir}/`).filter((file) => file.endsWith(".js"));

                        const cmds = commands.map((command) => {
                            let file = require(`../../Commands/${dir}/${command}`);
                            if (!file.name) return 'Loading...'; 
                            let name = file.name.replace('.js', '');
                            return `\`${name}\``;
                        });

                        let data = new Object();
                        data = {
                            name: dir.toUpperCase(),
                            value: cmds.length === 0 ? 'Trong tiến trình' : cmds.join(' '),
                        };

                        categories.push(data);
                    });

                    const embed = new EmbedBuilder()
                        .setAuthor({ name: `Danh sách lệnh của ${client.user.username}`, iconURL: message.guild.iconURL({ dynamic: true }) })
                        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                        .setDescription(`Sử dụng \`${prefix}help {lệnh}\` để xem thêm thông tin về lệnh.
                                        Prefix của bot: \`${prefix}\`
                                        Tổng lệnh bot có: \**${client.commands.size}\**`)
                        .addFields(categories)
                        .setFooter({ text: `Yêu cầu bởi: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                        .setTimestamp()
                        .setColor('GREEN');
                    return message.channel.send({ embeds: [embed] });
                } else {
                    const command =
                        client.commands.get(args[0].toLowerCase()) || client.commands.find(c => c.aliases && c.aliases.includes(args[0].toLowerCase()));

                    if (!command) {
                        const embed = new EmbedBuilder()
                            .setDescription(`Lệnh không hợp lệ! Sử dụng \`${prefix}help\` để xemn tất cả các lệnh!`)
                            .setColor('GREEN');
                        return message.channel.send({ embeds: [embed] });
                    }

                    const embed = new EmbedBuilder()
                        .setTitle('Thông tin của lệnh: ')
                        .addFields(
                            {name: 'Lệnh', value: command.name ? `\`${command.name}\`` : 'Không có tên cho lệnh này.'},
                            {name: 'Bí danh', value: command.aliases ? `\`${command.aliases.join("` `")}\`` : 'Không có bí danh cho lệnh này.'},
                            {name: 'Cách sử dụng:', value: command.usage? `\`${prefix}${command.name} ${command.usage}\``: `\`${prefix}${command.name}\``},
                            {name: 'Mô tả:', value: command.description? command.description : 'Không có mô tả cho lệnh này.'}
                        )
                        .setFooter({text: `Yêu cầu bởi: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                        .setTimestamp()
                        .setColor('GREEN');
                     return message.channel.send({ embeds: [embed] });
                     }
         },
};