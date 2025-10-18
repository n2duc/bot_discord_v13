const Canvas = require("canvas");
const { AttachmentBuilder } = require("discord.js");
const background = "https://imgur.com/q6nTfgK.jpg";

const dim = {
    height: 675,
    width: 1200,
    margin: 50
};

const av = {
    size: 256,
    x: 480,
    y: 170
};

const generateImage = async (member) => {
    const username = member.user.tag;
    const avatarURL = member.user.displayAvatarURL({ format: "png", dynamic: false, size: av.size });

    const canvas = Canvas.createCanvas(dim.width, dim.height);
    const ctx = canvas.getContext("2d");

    const backimg = await Canvas.loadImage(background);
    ctx.drawImage(backimg, 0, 0);

    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin, dim.height - 2 * dim.margin);

    const avimg = await Canvas.loadImage(avatarURL);
    ctx.save();

    ctx.beginPath();
    ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(avimg, av.x, av.y);
    ctx.restore();

    Canvas.registerFont('./iciel Cadena.ttf', { family: 'Cadena' });

    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    ctx.font = "50px Cadena";
    ctx.fillText("🎉 WELCOME 🎉", dim.width / 2, dim.margin + 70);

    ctx.font = "60px Cadena";
    ctx.fillText(username, dim.width / 2, dim.height - dim.margin - 125);

    ctx.font = "40px Cadena";
    ctx.fillText(`đến với server của mình <3`, dim.width / 2, dim.height - dim.margin - 50);

    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: "welcome.png" });
    return attachment;
};

module.exports = generateImage;
