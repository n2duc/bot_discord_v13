const { ActivityType } = require('discord.js');

module.exports = (client) => {
    console.log(`Bot is ready! ${client.user.tag}`);
    client.user.setActivity('CUDAH No.1 | Prefix .', { type: ActivityType.Watching });

    const activities = [
        "C ++",
        "C Sharp",
        "Python",
        "Javascript",
        "Java",
        "ReactJS",
        "VueJS",
        "AngularJS"
    ]

    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
        const newActivity = activities[randomIndex];

        client.user.setActivity(newActivity, {type: ActivityType.Playing});
    }, 5000);
}