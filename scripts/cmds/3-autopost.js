const cron = require('node-cron');
const axios = require('axios');

module.exports = {
  config: {
    name: 'autopost',
    version: '1.0.0',
    author: 'Jr Busaco',
    role: 0,
    category: 'Post - Postfacts',
    shortDescription: {
      en: 'Automatically posts cat facts on Facebook.',
    },
    longDescription: {
      en: 'Automatically posts cat facts on Facebook every hour.',
    },
    guide: {
      en: '{pn} autopost [on/off]',
    },
  },
  onStart: async function ({ api, event }) {
    const command = event.body.trim().toLowerCase();

    if (command === 'autopost on') {
      if (!isCronStarted) {
        startAutoPost(api);
        api.sendMessage('Autopost has been activated.', event.threadID);
      } else {
        api.sendMessage('Autopost is already running.', event.threadID);
      }
    } else if (command === 'autopost off') {
      if (isCronStarted) {
        stopAutoPost();
        api.sendMessage('Autopost has been deactivated.', event.threadID);
      } else {
        api.sendMessage('Autopost is not running.', event.threadID);
      }
    } else {
      api.sendMessage('Invalid command. Use "autopost on" to start and "autopost off" to stop.', event.threadID);
    }
  },
};

let isCronStarted = false;
let cronJob;

async function startAutoPost(api) {
  cronJob = cron.schedule("0 * * * *", async function () {
    try {
      const response = await axios.get("https://catfact.ninja/fact");
      const catFact = response.data.fact;

      const message = `𝚁𝙰𝙽𝙳𝙾𝙼 𝙲𝙰𝚃 𝙵𝙰𝙲𝚃: “${catFact}”`;

      const formData = {
        input: {
          composer_entry_point: "inline_composer",
          composer_source_surface: "timeline",
          idempotence_token: `${Date.now()}_FEED`,
          source: "WWW",
          message: {
            text: message,
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

      api.sendMessage(`[AUTO POST]\nLink: ${postLink}`, event.threadID);
      console.log(`[AUTO POST]\nLink: ${postLink}`);
    } catch (error) {
      console.error("Error during auto-posting:", error);
    }
  }, {
    scheduled: true,
    timezone: "Asia/Manila",
  });

  isCronStarted = true;
}

function stopAutoPost() {
  if (cronJob) {
    cronJob.stop();
    isCronStarted = false;
  }
                        }
