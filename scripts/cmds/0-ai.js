const axios = require('axios');

module.exports.config = {
    name: "ai",
    version: "1.0.0",
    hasPermission: 0,
    credits: "api by jerome",//api by jerome
    description: "Gpt architecture",
    usePrefix: false,
    commandCategory: "GPT4",
    cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
    try {
        const { messageID, messageReply } = event;
        let prompt = args.join(' ');

        if (messageReply) {
            const repliedMessage = messageReply.body;
            prompt = `${repliedMessage} ${prompt}`;
        }

        if (!prompt) {
            return api.sendMessage('Please provide a prompt to generate a text response.\nExample: ai What is the meaning of life?', event.threadID, messageID);
        }
        api.sendMessage('🔍 Searching for an answer to your question...', event.threadID);

        // Delay
        await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust the delay time as needed

        const gpt4_api = `https://gpt4withcustommodel.onrender.com/gpt?query=${encodeURIComponent(prompt)}&model=gpt-4`;

        const response = await axios.get(gpt4_api);

        if (response.data && response.data.response) {
            const generatedText = response.data.response;

            // Ai Answer Here
            api.sendMessage(`🤖 Ai Answer\n━━━━━━━━━━━━━━━━\n\n(ᴏᴡɴᴇʀ: ᴍᴀʀᴋ ᴍᴀʀᴛɪɴᴇᴢ)\n\n𝗔𝗻𝘀𝘄𝗲𝗿: ${generatedText}\n\n━━━━━━━━━━━━━━━━`, event.threadID, messageID);
        } else {
            console.error('API response did not contain expected data:', response.data);
            api.sendMessage(`❌ ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴡʜɪʟᴇ ɢᴇɴᴇʀᴀᴛɪɴɢ ᴛʜᴇ ᴛᴇxᴛ ʀᴇsᴘᴏɴsᴇ. ᴘʟᴇᴀsᴇ ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ. Response data: ${JSON.stringify(response.data)}`, event.threadID, messageID);
        }
    } catch (error) {
        console.error('Error:', error);
        api.sendMessage(`❌ ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴡʜɪʟᴇ ɢᴇɴᴇʀᴀᴛɪɴɢ ᴛʜᴇ ᴛᴇxᴛ ʀᴇsᴘᴏɴsᴇ. ᴘʟᴇᴀsᴇ ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ. Error details: ${error.message}`, event.threadID, event.messageID);
    }
};
