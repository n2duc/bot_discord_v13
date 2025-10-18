const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');

module.exports = {
  name: "userinfo",
  description: "Xem thông tin cá nhân !",
  category: "info",
  aliases: ['ui', 'whois', 'user'],
  usage: "[prefix]userinfo [tag/id]",
  botpermissions: ["EMBED_LINKS"],

  run: async (client, message, args) => {    
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if(!user) return message.reply('Người dùng không hợp lệ !!')
    const roles = user.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1)
    let oldStr = `${user.roles.highest.hexColor}`
    let hex = newStr = oldStr.substring(1);
    if (oldStr == '#000000') oldStr = '#4B0082';
    let bot = user.user.bot ? "🤖 Bot" : "🤵 Người";

    const devices = user.presence?.clientStatus || {};
    const description = () => {
      const entries = Object.entries(devices)
      .map(
        (value, index) => 
        `${value[0][0].toUpperCase()}${value[0].slice(1)}`
        )
      .join(" | ");
      const appareil = entries ? `\n[${Object.entries(devices).length}] **Thiết bị:** ${entries}` : ""
      return `${appareil}`;
    };

    async function getUserBannerUrl(userId) {
      const fetchedUser = await client.users.fetch(userId, { force: true });
      return fetchedUser.banner ? fetchedUser.bannerURL({ size: 4096 }) : null;
  }
  
      let mentionedUser = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
   
      const bannerUrl = await getUserBannerUrl(mentionedUser.id,({dynamic: true,  size: 4096 }));

      const banner = bannerUrl ? ` | [**Link Banner**](${bannerUrl})` : ``;

    const status = {
      "online": '🟢 Trực tuyến',
      "idle": '🟡 Chờ',
      "dnd": '🔴 Đừng làm phiền',
      "offline": '⚫ Ngoại tuyến'
    }

     const badges = {
      DISCORD_EMPLOYEE: `Discord Employee`,
      PARTNERED_SERVER_OWNER: `Partnered Server`,
      BUGHUNTER_LEVEL_1: `Bug Hunter Lv1`,
      BUGHUNTER_LEVEL_2: `Bug Hunter Lv2`,
      HYPESQUAD_EVENTS: `Hypesquad`,
      HOUSE_BRAVERY: ` House of Bravery`,
      HOUSE_BRILLIANCE: `House of Brilliance`,
      HOUSE_BALANCE: `House of Balance`,
      EARLY_SUPPORTER: `Early Supporter`,
      TEAM_USER: `Team User`,
      SYSTEM: `Verified System`,
      VERIFIED_BOT: `Verified Bot`,
      EARLY_VERIFIED_BOT_DEVELOPER: `Verified Bot Developer`
    };
         
    const UserFlags = (await user.user.fetchFlags()).toArray().map(flag => badges[flag]).join("\n ")
    const UserBadges = UserFlags ? `**Danh hiệu:** ${UserFlags}` : "\n";
        var permissions = [];

    if(user.permissions.has(PermissionsBitField.Flags.KickMembers)){
     permissions.push("Kick Members");
 }

 if(user.permissions.has(PermissionsBitField.Flags.BanMembers)){
     permissions.push("Ban Members");
 }

 if(user.permissions.has(PermissionsBitField.Flags.Administrator)){
     permissions.push("Administrator");
 }

 if(user.permissions.has(PermissionsBitField.Flags.ManageMessages)){
     permissions.push("Manage Messages");
 }

 if(user.permissions.has(PermissionsBitField.Flags.ManageChannels)){
     permissions.push("Manage Channels");
 }

 if(user.permissions.has(PermissionsBitField.Flags.MentionEveryone)){
     permissions.push("Mention Everyone");
 }

 if(user.permissions.has(PermissionsBitField.Flags.ManageNicknames)){
     permissions.push("Manage Nicknames");
 }

 if(user.permissions.has(PermissionsBitField.Flags.ManageRoles)){
     permissions.push("Manage Roles");
 }

 if(user.permissions.has(PermissionsBitField.Flags.ManageWebhooks)){
     permissions.push("Manage Webhooks");
 }

 if(user.permissions.has(PermissionsBitField.Flags.ManageGuildExpressions)){
     permissions.push("Manage Emojis");
 }

let compte = user.user.bot ? "của BOT" : `của người dùng` 
const pseudo = user.user.displayName ? `(${user.user.displayName})` : "";

    const permission = permissions.join(', ') ? `**Quyền:** ${permissions.join(', ')}` : "\n";

    const Reponse = new EmbedBuilder()
    .setAuthor({ name: `Thông tin về ${user.user.username}`, iconURL: `${user.user.displayAvatarURL({ dynamic: true, size: 1024 })}`})
    .setThumbnail(user.user.displayAvatarURL({ size: 2048, dynamic: true}))
    .setImage(bannerUrl)
    .setColor(`${oldStr}`)
    .addFields(
      {
        name: `📃 **Thông tin ${compte}:**`, 
        value: `**Tên:** ${
          user.user.username
        }${pseudo}\n**Tag:** ${
          user.user.tag
        }\n**Mention:**<@${
          user.user.id
        }>\n**ID ${compte}:** ${
          user.user.id
        }\n**Loại tài khoản:** ${
          bot
        }\n**Avatar:** [**Link Avatar**](${user.user.displayAvatarURL({ size: 2048, dynamic: true})})${banner}\n**Tạo vào lúc:** 
    <t:${Math.floor(user.user.createdTimestamp / 1000)}:D> <t:${Math.floor(user.user.createdTimestamp / 1000)}:R>
        ${UserBadges}\n` 
      },
      {
        name: `📜 **Thông tin ${compte} ở server**`,
        value: `**Vào server vào lúc:** 
    <t:${Math.floor(user.joinedTimestamp / 1000)}:D> <t:${Math.floor(user.joinedTimestamp / 1000)}:R>\n**Role cao nhất:** ${
          user.roles.highest
        }\n**Role Color:** [${
          user.roles.highest.hexColor}](https://www.color-hex.com/color/${hex
          })\n`},{
          name: `[${user.roles.cache.size - 1}] **Role(s):**`,
    value: `${roles.length == 0 ? "Không có" : roles.length < 10 ? roles.join('') : roles.length > 10 ? trimArray(roles) : roles
         }\n\n${permission}\n\n`
     })    
    .setTimestamp()   
    .setFooter({ text: `Yêu cầu bởi ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel('Avatar')
                .setStyle(ButtonStyle.Link)
                .setURL(user.user.displayAvatarURL({ size: 2048, dynamic: true }))
        );

        if (bannerUrl) {
            row.addComponents(
                new ButtonBuilder()
                    .setLabel('Banner')
                    .setStyle(ButtonStyle.Link)
                    .setURL(bannerUrl)
            );
        }

    message.reply({ embeds: [Reponse], components: [row] });
    
    function trimArray(arr, maxLen = 10){
        if(arr.length > maxLen){
            const len = arr.length - maxLen;
            arr = arr.slice(0, maxLen);
            arr.push(` **${len} khác...**`);
        }
        return arr;
    }
  }
}
