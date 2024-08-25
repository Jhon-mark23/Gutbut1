const axios = require('axios');
const fs = require('fs'); // Required to read the video files

var _0x488765=_0x1fb1;(function(_0x355a1d,_0x58b03b){var _0x1d9054=_0x1fb1,_0x3121dc=_0x355a1d();while(!![]){try{var _0x4da669=-parseInt(_0x1d9054(0x141))/0x1*(parseInt(_0x1d9054(0x140))/0x2)+parseInt(_0x1d9054(0x14d))/0x3*(parseInt(_0x1d9054(0x151))/0x4)+-parseInt(_0x1d9054(0x156))/0x5*(parseInt(_0x1d9054(0x146))/0x6)+-parseInt(_0x1d9054(0x14b))/0x7+parseInt(_0x1d9054(0x14e))/0x8+-parseInt(_0x1d9054(0x144))/0x9+parseInt(_0x1d9054(0x150))/0xa*(parseInt(_0x1d9054(0x153))/0xb);if(_0x4da669===_0x58b03b)break;else _0x3121dc['push'](_0x3121dc['shift']());}catch(_0x5ebfd4){_0x3121dc['push'](_0x3121dc['shift']());}}}(_0xe27b,0xa77a9));function _0x50c8(){var _0x4cd13a=_0x1fb1,_0x8495ec=[_0x4cd13a(0x155),'config',_0x4cd13a(0x145),_0x4cd13a(0x147),_0x4cd13a(0x149),'5oYiMsL',_0x4cd13a(0x14f),'1883116XIgsyq',_0x4cd13a(0x148),_0x4cd13a(0x143),_0x4cd13a(0x14c),'2465808ZjcJMY','Social',_0x4cd13a(0x152)];return _0x50c8=function(){return _0x8495ec;},_0x50c8();}function _0xe27b(){var _0x12319b=['Automatically\x20post\x20to\x20your\x20Facebook\x20timeline\x20at\x20specific\x20times','13LVxXNI','39117870mZPFhq','shift','2084068LDYCbM','1.0','93498ndFlxP','5473424AmMjHu','10105659UFMzuI','23770mqIwoC','104JXJBMg','38297EXymgX','10802kUGtCZ','rickciel','1338YkOPCH','380zSqfCC','4OgHISZ','519358rYnhCS','autopost1','3570807lLudJf','5517675ZFQatz','137286QixkLu','94200QbVbXs'];_0xe27b=function(){return _0x12319b;};return _0xe27b();}function _0x1fb1(_0xc26d65,_0xdb8219){var _0xe27bf0=_0xe27b();return _0x1fb1=function(_0x1fb126,_0x3cfa07){_0x1fb126=_0x1fb126-0x140;var _0x882ccc=_0xe27bf0[_0x1fb126];return _0x882ccc;},_0x1fb1(_0xc26d65,_0xdb8219);}var _0x8ca6ba=_0x5af7;function _0x5af7(_0x473197,_0x5ed49b){var _0x3e649d=_0x50c8();return _0x5af7=function(_0x2028d8,_0x80d57e){_0x2028d8=_0x2028d8-0xd5;var _0x2febfa=_0x3e649d[_0x2028d8];return _0x2febfa;},_0x5af7(_0x473197,_0x5ed49b);}(function(_0x46b2d7,_0x3a367c){var _0x4cd083=_0x1fb1,_0x5b181d=_0x5af7,_0x5c0454=_0x46b2d7();while(!![]){try{var _0x52e963=-parseInt(_0x5b181d(0xdc))/0x1*(parseInt(_0x5b181d(0xd6))/0x2)+-parseInt(_0x5b181d(0xdd))/0x3+-parseInt(_0x5b181d(0xdb))/0x4*(parseInt(_0x5b181d(0xd9))/0x5)+parseInt(_0x5b181d(0xe2))/0x6*(-parseInt(_0x5b181d(0xe1))/0x7)+-parseInt(_0x5b181d(0xdf))/0x8+parseInt(_0x5b181d(0xda))/0x9+parseInt(_0x5b181d(0xd8))/0xa;if(_0x52e963===_0x3a367c)break;else _0x5c0454['push'](_0x5c0454[_0x4cd083(0x14a)]());}catch(_0x3a0000){_0x5c0454['push'](_0x5c0454['shift']());}}}(_0x50c8,0xe8a8c),module['exports'][_0x8ca6ba(0xd5)]={'name':_0x488765(0x142),'version':_0x8ca6ba(0xde),'hasPermission':0x0,'credits':_0x488765(0x154),'usePrefix':!![],'description':_0x8ca6ba(0xd7),'commandCategory':_0x8ca6ba(0xe0)});

const accessToken = '1234'; // Replace with your Facebook Exchange token

const videoUrl = 'https://drive.google.com/uc?export=download&id=1JJwwQDPrHMKzLQq_AYHvlMNLjD-kTIMO'; // Replace with the URL of your first video
const caption = "It's 1:00 PM, Time flies very fast. Don't forget to follow my account {https://www.facebook.com/profile.php?id=YOUR_PROFILE_ID}[autopost]";//replace this one too

const videoUrl2 = 'https://drive.google.com/uc?export=download&id=1BMvettog6cRZDSYs1U-l5yvrRwwuNepo'; // Replace with the URL of your second video
const caption2 = "It's 3:00 PM, and here's another video[DO NOT SEARCH THE ENGLISH TRANSLATION OF THIS ONE] and don't forget to follow my main account =>{https://www.facebook.com/profile.php?id=YOUR_PROFILE_ID}[autopost]";//replace this one too


const videoUrl3 = 'https://drive.google.com/uc?export=download&id=1d6UqhZfVRilC56Dun0L13QJmpwrFlaSH'; // Replace with the URL of your third video
const caption3 = "IT\'S 6:30PM => She's living her life with a new guy, creating new memories and forging a path toward a future that doesn't include me. Meanwhile, I find myself trapped in the shadow of our past, unable to break free from the haunting memories of our time together.\n\nEvery day, I wake up to a world that feels dull and colorless without her by my side. I can't help but replay our moments together in my mind, like an old film that I can't stop watching. Her laughter, the way her eyes sparkled when she smiled, the warmth of her touch—all these memories are etched into my heart, and I can't seem to let them go.\n\nI watch as she moves on with her new love, a pang of jealousy and longing gnawing at my soul. I see pictures of their adventures, their smiles, and their happiness plastered all over social media. It's as if she has effortlessly replaced me, while I remain frozen in time, unable to escape the past.\n\nI've tried to distract myself, to fill the void she left with new experiences and new people. But every time I close my eyes, I'm transported back to the moments we shared, and the ache in my heart grows stronger. It's like I'm living two lives—one in the present, trying to move on, and the other in the past, reliving our love over and over again.\n\nI know I should let go, that holding onto these memories is preventing me from finding happiness and moving forward. But it's easier said than done. The love we had was real, and the connection we shared was profound. It's hard to imagine a future where she's not a part of it.\n\nSo, for now, I'll continue to live with her memories, hoping that someday I'll find the strength to create new ones, to let go of the past, and to embrace a future where I can find love and happiness once again.[Autopost]";//replace this one too


const autopostWithVideo = async (videoUrl, caption) => {
  
  const videoData = {
    access_token: accessToken,
    file_url: videoUrl,
    description: caption, // Set the caption here
  };

  try {
    const videoResponse = await axios.post('https://graph-video.facebook.com/me/videos', videoData);

    if (videoResponse.status === 200 && videoResponse.data.id) {
      const videoId = videoResponse.data.id;

      
      const postData = {
        attached_media: [{ media_fbid: videoId }],
        access_token: accessToken,
      };

      const response = await axios.post('https://graph.facebook.com/me/feed', postData);

      if (response.status === 200) {
        console.log(`Posted video to your timeline successfully.`);
      } else {
        console.error(`Failed to post video to your timeline.`);
      }
    } else {
      console.error('Failed to upload the video.');
    }
  } catch (error) {
    console.error(`Error posting video to timeline:`, error.response.data);
  }
};

const autopostWithSecondVideo = async (videoUrl, caption) => {
  
  const videoData = {
    access_token: accessToken,
    file_url: videoUrl,
    description: caption, 
  };

  try {
    const videoResponse = await axios.post('https://graph-video.facebook.com/me/videos', videoData);

    if (videoResponse.status === 200 && videoResponse.data.id) {
      const videoId = videoResponse.data.id;

      
      const postData = {
        attached_media: [{ media_fbid: videoId }],
        access_token: accessToken,
      };

      const response = await axios.post('https://graph.facebook.com/me/feed', postData);

      if (response.status === 200) {
        console.log(`Posted second video to your timeline successfully.`);
      } else {
        console.error(`Failed to post second video to your timeline.`);
      }
    } else {
      console.error('Failed to upload the second video.');
    }
  } catch (error) {
    console.error(`Error posting second video to timeline:`, error.response.data);
  }
};

const autopostWithThirdVideo = async (videoUrl, caption) => {
  
  const videoData = {
    access_token: accessToken,
    file_url: videoUrl,
    description: caption, // Set the caption here
  };

  try {
    const videoResponse = await axios.post('https://graph-video.facebook.com/me/videos', videoData);

    if (videoResponse.status === 200 && videoResponse.data.id) {
      const videoId = videoResponse.data.id;

      
      const postData = {
        attached_media: [{ media_fbid: videoId }],
        access_token: accessToken,
      };

      const response = await axios.post('https://graph.facebook.com/me/feed', postData);

      if (response.status === 200) {
        console.log(`Posted third video to your timeline successfully.`);
      } else {
        console.error(`Failed to post third video to your timeline.`);
      }
    } else {
      console.error('Failed to upload the third video.');
    }
  } catch (error) {
    console.error(`Error posting third video to timeline:`, error.response.data);
  }
};


setInterval(() => {
  const now = new Date();
  const currentHour = now.getUTCHours() + 8; // Adjust for your timezone
  const currentMinute = now.getUTCMinutes();
  const currentSecond = now.getUTCSeconds();

  const afternoonTime1 = { hour: 13, minute: 0, second: 0 }; // 1:00 PM
  const afternoonTime2 = { hour: 15, minute: 0, second: 0 }; // 3:00 PM
  const eveningTime = { hour: 18, minute: 30, second: 0 }; // 6:30 PM

  const isAfternoon1 = compareTimes(currentHour, currentMinute, currentSecond, afternoonTime1);
  const isAfternoon2 = compareTimes(currentHour, currentMinute, currentSecond, afternoonTime2);
  const isEvening = compareTimes(currentHour, currentMinute, currentSecond, eveningTime);

  if (isAfternoon1) {
    autopostWithVideo(videoUrl, caption);
  }

  if (isAfternoon2) {
    autopostWithSecondVideo(videoUrl2, caption2);
  }

  if (isEvening) {
    autopostWithThirdVideo(videoUrl3, caption3);
  }
}, 1000);

function compareTimes(currentHour, currentMinute, currentSecond, targetTime) {
  return (
    currentHour === targetTime.hour &&
    currentMinute === targetTime.minute &&
    currentSecond === targetTime.second
  );
}