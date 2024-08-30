const axios = require("axios");

module.exports = {
    config: {
        name: "ai",
        version: "1.0",
        author: "Rui",
        countDown: 5,
        role: 0,
        shortDescription: {
            vi: "Tương tác với trí tuệ nhân tạo để nhận câu trả lời cho câu hỏi của bạn.",
            en: "Interact with an AI to get responses to your questions."
        },
        longDescription: {
            vi: "Tương tác với trí tuệ nhân tạo để nhận câu trả lời cho câu hỏi của bạn.",
            en: "Interact with an AI to get responses to your questions."
        },
        category: "group",
        guide: {
            vi: "Sử dụng: `:ai <câu hỏi>`",
            en: "Usage: `:ai <question>`"
        }
    },

    onStart: async function ({ api, args, message, event, threadsData, usersData, dashBoardData, globalData, threadModel, userModel, dashBoardModel, globalModel, role, commandName, getLang }) {
        const question = args.join(" ").trim();
        const senderID = event.senderID;

        if (question) {
            try {
                const userName = usersData[senderID].name;
                const botName = module.exports.config.name;
                const formattedQuestion = `${userName} asked: ${question} (Bot: ${botName})`;

                message.reply("🤖 " + getLang("hello") + ", " + userName + "! " + getLang("helloWithName", senderID));
                const response = await axios.get(`https://hercai.onrender.com/v2/hercai?question=${encodeURIComponent(formattedQuestion)}`);
                const aiResponse = response.data.reply;
                message.reply(`YueAI: ${aiResponse}`);
            } catch (error) {
                console.error("Error fetching AI response:", error);
                message.reply("Failed to get AI response. Please try again later.");
            }
        } else {
            message.reply("Please provide a question after the command. For example: `:ai Hello`");
        }
    }
};
