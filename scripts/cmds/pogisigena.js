const axios = require("axios");

module.exports = {
  config: {
    name: "pogisigena",
    aliases: ["pogisigenav2"],
    version: "1.0",
    author: "RICKCIEL",
    countDown: 2,
    role: 0,
    shortDescription: {
      en: "pogi moo"
    }
  },
  onStart: async function ({ api, event }) {
    try {
      const API_SERVER_URL = 'https://pogi-api-random.chatbotmesss.repl.co';
      const response = await axios.get(`${API_SERVER_URL}/api/pogi/random`);
      const videoUrls = response.data;

      const randomVideoUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];

      const videoStreamResponse = await axios.get(randomVideoUrl, { responseType: 'stream' });

      const message = {
        body: "Pogi sige na",
        attachment: videoStreamResponse.data,
      };

      await api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
      console.error('Error fetching or sending the video:', error);
      api.sendMessage("Error sending the video.", event.threadID, event.messageID);
    }
  }
};