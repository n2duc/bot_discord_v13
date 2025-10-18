const { EmbedBuilder } = require('discord.js')
const weather = require('weather-js')

module.exports = {
    name: 'weather',
    category: 'info',
    cooldown: 5,
    description: 'Xem thời tiết khu vực bạn ở',
    aliases: ['weather', 'wt'],
    run: async(client, message, args) => {
        const city = args.join(" ");
        if (!city) {
            return message.channel.send("Vui lòng điền nơi bạn muốn xem thời tiết !");
        }

        weather.find({ search: city, degreeType: "C" }, (error, result) => {
            if (error) return message.channel.send("Đã có lỗi xảy ra !");
            else if (result.length === 0) {
                return message.channel.send("Không tìm thấy thành phố của bạn !");
            }

            let current = result[0].current;
            let location = result[0].location
            const embed = new EmbedBuilder()
                .setColor('#b9fbc0')
                .setAuthor({ name: `Thời tiết ở ${current.observationpoint} ngày hôm nay`, iconURL: current.imageUrl })
                .setThumbnail(current.imageUrl)
                .setDescription(`**${current.skytext}**`)
                .addFields(
                    { name: 'Múi giờ:', value: `UTC ${location.timezone}`, inline: true },
                    { name: 'Nhiệt độ:', value: `${current.temperature}°C`, inline: true },
                    { name: 'Gió:', value: `${current.winddisplay}`, inline: true },
                )
                .addFields(
                    { name: 'Feels Like:', value: `${current.feelslike}°C`, inline: true },
                    { name: 'Độ ẩm:', value: `${current.humidity}%`, inline: true },
                    { name: 'Người yêu:', value: 'Đéo có', inline: true },
                )
                .setTimestamp()
                .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
            message.channel.send({ embeds: [embed] });
        })
    }
}