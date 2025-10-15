// reconstructed / deobfuscated version (readable)
module.exports.config = {
  name: "\n",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝗭𝗜𝗦𝗔𝗡 𝗔𝗛𝗠𝗘𝗗",
  description: "Info  \n\n𝐁𝐨𝐭 𝐎wner info and thanks message",
  commandCategory: "poster",
  usages: ".",
  cooldowns: 11,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.run = async function({ api, event, args, client, Users, Threads, __GLOBAL, Currencies }) {
  const fs = require('fs-extra');
  const request = require('request'); // or axios
  const path = require('path');

  // some of the strings observed in the obfuscated array:
  const captionsParts = [
    "🌸Assalamu alaikum 🌸 𝐁𝐨𝐭 𝐎wner➢ 𝗭𝗜𝗦𝗔𝗡 𝗔𝗛𝗠𝗘𝗗 Thanks For using my bot 🎁"
    // ... (original had many small fragments concatenated)
  ];

  // list of candidate image URLs observed
  const imageUrls = [
    "https://i.imgur.com/ai11602.mp4",
    "https://i.imgur.com/ai11602.mp4",
    "/cyber.mp4" // sometimes used as local filename
    // (original had many repeated zF5f2BD.jp and some other hosts)
  ];

  // pick random caption and random image
  const randCaption = captionsParts[Math.floor(Math.random() * captionsParts.length)];
  const randImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];

  // local file path to save the downloaded image
  const savePath = path.join(__dirname, "cyber.mp4");

  // download image and save to disk (using request stream)
  await new Promise((resolve, reject) => {
    // ensure any previous file removed
    try { if (fs.existsSync(savePath)) fs.unlinkSync(savePath); } catch(e){}

    request.get(encodeURI(randImageUrl))
      .on('error', err => reject(err))
      .pipe(fs.createWriteStream(savePath))
      .on('finish', () => resolve())
      .on('error', err => reject(err));
  });

  // send message with attachment and caption
  api.sendMessage({
    body: " " + randCaption + " ",
    attachment: fs.createReadStream(savePath)
  }, event.threadID, () => {
    // delete the temporary file after sending
    try { fs.unlinkSync(savePath); } catch(e){}
  });
};
