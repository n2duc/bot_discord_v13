const math = require('mathjs')
const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "math",
    category: "fun",
    description: "Tính toán nhanh tất cả phép tính",
    usage: 'sqrt()||pow()||log()',
    run: async(client, message, args) => {
        if (!args[0]) return message.reply("Nhập phép tính để tính chứ cái đ*t mother ??")
        let resp;
        try {
            resp = math.evaluate(args.join(' '));
        } catch (e) {
            return message.channel.send("Mình không giải được :(")
        }
        const embed = new EmbedBuilder()
            .setColor(0xffffff)
            .setTitle('Math Calculation')
            .addFields(
                { name: 'Input:', value: `\`\`\`${args.join(' ')}\`\`\``, inline: true},
                { name: 'Output:', value: `\`\`\`js\n${resp}\`\`\``, inline: false }
            )
        message.channel.send({ embeds: [embed] })
    }

}