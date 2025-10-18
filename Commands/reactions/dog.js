const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "dog",
    category: "reactions",
    descriptions: 'Xem ảnh Chó bựa',
    run: async (client, message, args) => {
        const url = "https://some-random-api.ml/img/dog";

        let image, response;
        try {
            response = await axios.get(url);
            image = response.data;

        } catch (e) {
            return message.channel.send(`Lỗi !! Vui lòng thử lại`)
        }

        const embed = new EmbedBuilder()
            .setColor('RANDOM')
            .setImage(image.link)

        await message.channel.send({embeds: [embed]})
    }
}