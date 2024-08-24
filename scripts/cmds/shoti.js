module.exports = {
  config: {
    name: "shoti",
    version: "1.0",
    author: "XyryllPanget",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "",
    },
    longDescription: {
      vi: "",
      en: "",
    },
    category: "chatbox",
    guide: {
      vi: "",
      en: "",
    },
  },

  langs: {
    vi: {
      // Vietnamese translations here
    },
    en: {
      // English translations here
    },
  },

  onStart: async function ({ api, args, message, event, threadsData, usersData, dashBoardData, globalData, threadModel, userModel, dashBoardModel, globalModel, role, commandName, getLang }) {
    api.sendMessage("Shoti command is starting!", event.threadID);
    const axios = require("axios");
    const request = require('request');
    const fs = require("fs");

    try {
      const data = await axios.get('https://shoti-api.libyzxy0.repl.co/api/get-shoti?apikey=shoti-1h708cngd8l38mgb77');
      const file = fs.createWriteStream(__dirname + "/cache/shoti.mp4");
      const rqs = request(encodeURI(data.data.data.url));
      console.log('Shoti Downloaded >>> ' + data.data.data.id);

      rqs.pipe(file);
      file.on('finish', () => {
        api.sendMessage({
          attachment: fs.createReadStream(__dirname + '/cache/shoti.mp4')
        }, event.threadID, event.messageID);
      });
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while fetching the video.", event.threadID);
    }
  },
};
