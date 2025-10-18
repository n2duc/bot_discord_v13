const { EmbedBuilder } = require("discord.js");
const akaneko = require("akaneko")

module.exports = {
    name: 'nsfw',
    description: 'Zone 18+',
    aliases: ['18'],
    category: 'reactions',
    usage: 'option',


    run: async(client, message, args) => {

        const answer = args.join(" ")

        if(!answer) {
            message.channel.send('Điền thêm cái gì gì đó ở sau mới xem được chứ ?? sử dụng lệnh \`{prefix}nsfw cmd\` để xem chi tiết !')
        } else {
            if (!message.channel.nsfw) {
                message.channel.send("Đây không phải là kênh NSFW để sử dụng lệnh này !!")
                message.react('❌')
            } else if(answer == 'doujin') {
                
                const image = await akaneko.nsfw.doujin()
                const embed = new EmbedBuilder()
                    .setColor("RED")
                    .setImage(image);
                message.channel.send({embeds: [embed]});
                
            } else if(answer == 'pussy') {
                
                const image = await akaneko.nsfw.pussy()
                const embed = new EmbedBuilder()
                    .setColor("RED")
                    .setImage(image);
                message.channel.send({embeds: [embed]});

            } else if(answer == 'yuri') {
                
                const image = await akaneko.nsfw.yuri()
                const embed = new EmbedBuilder()
                    .setColor("RED")
                    .setImage(image);
                message.channel.send({embeds: [embed]});

            } else if(answer == 'ass') {
                
                const image = await akaneko.nsfw.ass()
                const embed = new EmbedBuilder()
                    .setColor("RED")
                    .setImage(image);
                message.channel.send({embeds: [embed]});

            } else if(answer == 'gif') {
                
                const image = await akaneko.nsfw.gifs()
                const embed = new EmbedBuilder()
                    .setColor("RED")
                    .setImage(image);
                message.channel.send({embeds: [embed]});

            } else if(answer == 'thudam') {
                
                const image = await akaneko.nsfw.masturbation()
                const embed = new EmbedBuilder()
                    .setColor("RED")
                    .setImage(image);
                message.channel.send({embeds: [embed]});

            } else if(answer == 'panties') {
                
                const image = await akaneko.nsfw.panties()
                const embed = new EmbedBuilder()
                    .setColor("RED")
                    .setImage(image);
                message.channel.send({embeds: [embed]});

            } else if(answer == 'uniform') {
                
                const image = await akaneko.nsfw.uniform()
                const embed = new EmbedBuilder()
                    .setColor("RED")
                    .setImage(image);
                message.channel.send({embeds: [embed]});

            } else if(answer == 'glasses') {
                
                const image = await akaneko.nsfw.glasses()
                const embed = new EmbedBuilder()
                    .setColor("RED")
                    .setImage(image);
                message.channel.send({embeds: [embed]});

            }  else if(answer == 'school') {
                
                const image = await akaneko.nsfw.school()
                const embed = new EmbedBuilder()
                    .setColor("RED")
                    .setImage(image);
                message.channel.send({embeds: [embed]});
            
            } else if(answer == 'cum') {
                
                const image = await akaneko.nsfw.cum()
                const embed = new EmbedBuilder()
                    .setColor("RED")
                    .setImage(image);
                message.channel.send({embeds: [embed]});
            
            } else if (answer == 'cmd') {
                const embed = new EmbedBuilder()
                    .setTitle("Lựa chọn của lệnh \`NSFW\`:")
                    .setColor('BLURPLE')
                    .setDescription('\`pussy\` \`doujin\` \`yuri\` \`ass\` \`gif\` \`thudam\` \`panties\` \`uniform\` \`glasses\` \`school\` \`cum\`')
                    .setTimestamp()
                    .setFooter({text: `Yêu cầu: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                message.channel.send({embeds: [embed]})
            } else {
                message.channel.send("❌ **Không có câu lệnh này !! Vui lòng thử lại hoặc xem lại danh sách lệnh **")
                const embed = new EmbedBuilder()
                    .setTitle("Lựa chọn của lệnh \`NSFW\`:")
                    .setColor('BLURPLE')
                    .setDescription('\`pussy\` \`doujin\` \`yuri\` \`ass\` \`gif\` \`thudam\` \`panties\` \`uniform\` \`glasses\` \`school\` \`cum\`')
                    .setTimestamp()
                    .setFooter({text: `Yêu cầu: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                message.channel.send({embeds: [embed]})
            }
        }

        
    } 
}
