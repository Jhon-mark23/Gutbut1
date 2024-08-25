const axios = require("axios");
const request = require('request');
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "shoti",
    version: "1.1",
    author: "ArYAN",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Fetch Shoti video",
    },
    longDescription: {
      en: "Fetches a Shoti video and sends it to the chat.",
    },
    category: "media",
    guide: {
      en: "Use this command to fetch and share a Shoti video.",
    },
  },

  onStart: async function ({ api, args, message, event }) {
    api.sendMessage("Fetching Shoti video...", event.threadID, event.messageID);

    const videoPath = path.join(__dirname, "/cache/shoti.mp4");
    const apiUrl = 'https://c-v1.onrender.com/shoti?apikey=$c-v1-7bejgsue6@iygv';

    try {
      const response = await axios.get(apiUrl);
      const { data } = response;

      if (data && data.code === 200 && data.data) {
        const { url: videoURL, cover: coverURL, title, duration, user } = data.data;
        const { username: userName, nickname: userNickname, userID } = user;

        const file = fs.createWriteStream(videoPath);
        const rqs = request(encodeURI(videoURL));

        rqs.pipe(file);

        file.on('finish', () => {
          const messageToSend = {
            body: `🎀 𝗦𝗵𝗼𝘁𝗶\n━━━━━━━━━━\n📝 𝗧𝗶𝘁𝗹𝗲: ${title}\n👑 𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲: ${userName}\n🎯 𝗡𝗶𝗰𝗸𝗻𝗮𝗺𝗲: ${userNickname}\n⏳ 𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻: ${duration}\n🆔 𝗨𝘀𝗲𝗿𝗜𝗗: ${userID}`,
            attachment: fs.createReadStream(videoPath)
          };

          api.sendMessage(messageToSend, event.threadID, (err) => {
            if (err) {
              console.error(err);
              api.sendMessage("An error occurred while sending the video.", event.threadID, event.messageID);
            }
            
            fs.unlink(videoPath, (err) => {
              if (err) console.error("Error deleting video file:", err);
            });
          });
        });

        file.on('error', (err) => {
          console.error("Error downloading video:", err);
          api.sendMessage("An error occurred while downloading the video.", event.threadID, event.messageID);
        });
      } else {
        api.sendMessage("Failed to fetch the video. Invalid response from the API.", event.threadID, event.messageID);
      }
    } catch (error) {
      console.error("Error fetching video from API:", error);
      api.sendMessage("An error occurred while fetching the video.", event.threadID, event.messageID);
    }
  },
};
