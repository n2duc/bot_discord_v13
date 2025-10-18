const { Client, EmbedBuilder } = require('discord.js')
const axios = require("axios");
module.exports = {
  name: "cat",
  category: "reactions",
  descriptions: 'Xem ảnh mèo cuti hột le',
  run: async (client, message, args) => {
    const url = 'https://aws.random.cat/meow?ref=apilist.cute'

    let data, response

    try {
      response = await axios.get(url)
      data = response.data;
    } catch (e) {
      return message.channel.send('Lỗi !! Vui lòng thử lại')
    }
    const e = new EmbedBuilder()
    .setColor('RANDOM')
    .setImage(data.file)
    message.channel.send({embeds: [e]})
  }
}