const cron = require('node-cron');
const axios = require('axios');

module.exports = {
	config: {
		name: "autopost-catfact",
		version: "1.0.0",
		author: "JrDev06", 
		category: "automation"
	},

	langs: {
		vi: {
			postSuccess: "[TỰ ĐỘNG ĐĂNG]\nLiên kết: %1",
			postError: "Đã xảy ra lỗi khi đăng bài!"
		},
		en: {
			postSuccess: "[AUTO POST]\nLink: %1",
			postError: "Error during auto-posting!"
		}
	},

	onStart: async function ({ api, message, getLang }) {
		if (!isCronStarted) {
			startAutoPost(api, message, getLang);
			isCronStarted = true;
		}
	}
};

let isCronStarted = false;

function startAutoPost(api, message, getLang) {
	cron.schedule("0 * * * *", async function () {
		try {
			const response = await axios.get("https://catfact.ninja/fact");
			const catFact = response.data.fact;

			const formData = {
				input: {
					composer_entry_point: "inline_composer",
					composer_source_surface: "timeline",
					idempotence_token: `${Date.now()}_FEED`,
					source: "WWW",
					message: {
						text: `𝚁𝙰𝙽𝙳𝙾𝙼 𝙲𝙰𝚃 𝙵𝙰𝙲𝚃 meow: “${catFact}”`,
					},
					audience: {
						privacy: {
							base_state: "EVERYONE",
						},
					},
					actor_id: api.getCurrentUserID(),
				},
			};

			const postResult = await api.httpPost(
				"https://www.facebook.com/api/graphql/",
				{
					av: api.getCurrentUserID(),
					fb_api_req_friendly_name: "ComposerStoryCreateMutation",
					fb_api_caller_class: "RelayModern",
					doc_id: "7711610262190099",
					variables: JSON.stringify(formData),
				}
			);

			const postID = postResult.data.story_create.story.legacy_story_hideable_id;
			const postLink = `https://www.facebook.com/${api.getCurrentUserID()}/posts/${postID}`;

			message.send(getLang("postSuccess", postLink));
			console.log(getLang("postSuccess", postLink));
		} catch (error) {
			message.send(getLang("postError"));
			console.error(getLang("postError"), error);
		}
	}, {
		scheduled: true,
		timezone: "Asia/Manila",
	});
}
