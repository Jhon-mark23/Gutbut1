const axios = require('axios');

async function checkAuthor(authorName) {
  try {
    const response = await axios.get('https://author-check.vercel.app/name');
    const apiAuthor = response.data.name;
    return apiAuthor === authorName;
  } catch (error) {
    console.error("Error checking author:", error);
    return false;
  }
}

async function a(api, event, args, message) {
  try {
    const isAuthorValid = await checkAuthor(module.exports.config.author);
    if (!isAuthorValid) {
      await message.reply("Author changer alert! Unauthorized modification detected.");
      return;
    }

    const a = args.join(" ").trim();

    if (!a) {
      return message.reply("ex: {p} cmdName {your question} ");
    }

    const b = "you are zoro ai"; // the more better content you give the  best it became
    const c = await d(a, b);

    if (c.code === 2 && c.message === "success") {
      message.reply(c.answer, (r, s) => {
        global.GoatBot.onReply.set(s.messageID, {
          commandName: module.exports.config.name,
          uid: event.senderID 
        });
      });
    } else {
      message.reply(" 🥲 | Please try again later.");
    }
  } catch (e) {
    console.error("Error:", e);
    message.reply("An error occurred while processing your request.");
  }
}

async function d(a, b) {
  try {
    const d = await axios.get(`https://personal-ai-phi.vercel.app/kshitiz?prompt=${encodeURIComponent(a)}&content=${encodeURIComponent(b)}`);
    return d.data;
  } catch (f) {
    console.error("Error from api", f.message);
    throw f;
  }
}

module.exports = {
  config: {
    name: "ai",// add your ai name here
    version: "1.0",
    author: "Vex_Kshitiz", // dont change this or cmd will not work
    role: 0,
    longDescription: "your ai description",// ai description
    category: "ai",
    guide: {
      en: "ai what is the meaning of life"// add guide based on your ai name
    }
  },

  handleCommand: a,
  onStart: function ({ api, message, event, args }) {
  api.sendMessage('⏳ |Sending please wait..', event.threadID);
    api.setMessageReaction("⏳", event.messageID, (err) => {}, true);
    return a(api, event, args, message);
  },
  onReply: function ({ api, message, event, args }) {
  api.sendMessage('🤖 𝐀𝐈 𝐀𝐍𝐒𝐖𝐄𝐑 \n\n »»————> ---- <————«« ', event.threadID);
    api.setMessageReaction("🤙", event.messageID, (err) => {}, true);
    return a(api, event, args, message);
  }
};
