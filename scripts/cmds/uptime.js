const os = require('os');
const fs = require('fs').promises;
const pidusage = require('pidusage');

module.exports = {
		config: {
				name: 'uptime',
				version: '1.0',
				author: "GERALD MAX", // Do not change credits. www.facebook.com/g13065994 follow me
				countDown: 5,
				role: 0,
				shortDescription: 'shows how long uptime',
				longDescription: {
						en: ''
				},
				category: 'system',
				guide: {
						en: '{p}uptime'
				}
		},

		byte2mb(bytes) {
				const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
				let l = 0, n = parseInt(bytes, 10) || 0;
				while (n >= 1024 && ++l) n = n / 1024;
				return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
		},

		async getStartTimestamp() {
				try {
						const startTimeStr = await fs.readFile('uptime_start_time.txt', 'utf8');
						return parseInt(startTimeStr);
				} catch (error) {
						// If file doesn't exist or there's an error reading it, return current timestamp
						return Date.now();
				}
		},

		async saveStartTimestamp(timestamp) {
				try {
						await fs.writeFile('uptime_start_time.txt', timestamp.toString());
				} catch (error) {
						console.error('Error saving start timestamp:', error);
				}
		},

		getUptime(uptime) {
				const days = Math.floor(uptime / (3600 * 24));
				const hours = Math.floor((uptime % (3600 * 24)) / 3600);
				const mins = Math.floor((uptime % 3600) / 60);
				const seconds = Math.floor(uptime % 60);

				return `Uptime: ${days} day(s), ${hours} hour(s), ${mins} minute(s), and ${seconds} second(s)`;
		},

		onStart: async ({ api, event, args, usersData, threadsData }) => {
				const startTime = await module.exports.getStartTimestamp();
				const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
				const days = Math.floor(uptimeSeconds / (3600 * 24));
				const hours = Math.floor((uptimeSeconds % (3600 * 24)) / 3600);
				const minutes = Math.floor((uptimeSeconds % 3600) / 60);
				const seconds = Math.floor(uptimeSeconds % 60);

				const usage = await pidusage(process.pid);

                    const currentDate = new Date();
                   const options = { year: "numeric", month: "numeric", day: "numeric" };
                  const date = currentDate.toLocaleDateString("en-US", options);
                 const time = currentDate.toLocaleTimeString("en-US", {
        timeZone: "Africa/Lagos",
        hour12: true,
      });

                   const allUsers = await usersData.getAll();
                   const allThreads = await threadsData.getAll();
                   const uptime = process.uptime();

				const timeStart = Date.now();
				const uptimeMessage = module.exports.getUptime(uptimeSeconds);
				const returnResult = `╭─────────────⭓\n├ BOT UPTIME\n╰─────────────⭓\n「TUTEL BOT」has been working for ${uptimeMessage}\n├───── SYSTEM INFO ⭔\n│ 🖥 CPU usage: ${usage.cpu.toFixed(1)}% \n│📀 RAM usage: ${module.exports.byte2mb(usage.memory)} \n│🔌 Cores: ${os.cpus().length}\n│🏃Ping: ${Date.now() - timeStart}\n│💻Operating System platform: Linux \n│💾 system CPU Architecture: x64\n├───── BOT STATS ⭔\n│▫Date: ${date}\n│▫Time: ${time}\n\n│TOTAL USERS: ${allUsers.length}\n│TOTAL GROUP: ${allThreads.length}\n├───── BOT OWNER ⭔\n https://www.facebook.com/profile.php?id=100030880666720&mibextid=ZbWKwL`;

				await module.exports.saveStartTimestamp(startTime); // Save the start time again to ensure it's updated
				return api.sendMessage(returnResult, event.threadID, event.messageID);
		}
};
