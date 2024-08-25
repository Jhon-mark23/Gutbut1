const path = require("path");
const axios = require("axios");
const fs = require("fs");

module.exports = {
  config: {
    name: "video",
    description: "Search video from YouTube",
    usage: "video [search]",
    cooldown: 9,
    accessableby: 0,
    category: "media",
    prefix: true,
  },

  start: async function ({ api, text, event, reply }) {
    try {
      const searchQuery = text.join(" ");
      if (!searchQuery) {
        return reply("Usage: video <search text>");
      }

      const ugh = await reply(`⏱️ | Searching for '${searchQuery}', please wait...`);
      api.setMessageReaction("🕥", event.messageID, () => {}, true);

      const response = await axios.get(`https://chorawrs-sheshh.vercel.app/video?search=${encodeURIComponent(searchQuery)}`);

      const { downloadUrl: videoUrl, title, thumbnail } = response.data;
      const videoPath = path.join(__dirname, "cache", "video.mp4");

      const videoResponse = await axios.get(videoUrl, { responseType: "arraybuffer" });
      fs.writeFileSync(videoPath, Buffer.from(videoResponse.data));

      api.setMessageReaction("✅", event.messageID, () => {}, true);

      await api.sendMessage(
        {
          body: `Here's your video, enjoy!🥰\n\nTitle: ${title}\nImage: ${thumbnail}`,
          attachment: fs.createReadStream(videoPath),
        },
        event.threadID,
        event.messageID
      );

      fs.unlinkSync(videoPath);
      api.unsendMessage(ugh.messageID);
    } catch (error) {
      reply(`error: ${error.message}`);
      console.log(error);
    }
  },
};
