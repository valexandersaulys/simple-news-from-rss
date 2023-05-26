const fs = require("fs");

const _writeOneFile = async (feedTitle, feedItem) => {
  await fs.writeFileSync(
    `./output/${feedTitle}/${feedItem.linkUuid}`,
    feedItem.renderedHtml
  );
};

const dumpToDisk = async (feed) => {
  if (!fs.existsSync("./output")) fs.mkdirSync("./output");
  if (!fs.existsSync(`./output/${feed.title}`)) {
    fs.mkdirSync(`./output/${feed.title}`);
  }
  await Promise.all(
    feed.feedLinks.map((feedItem) => _writeOneFile(feed.feedName, feedItem))
  );
  return feed;
};

module.exports = {
  dumpToDisk,
};
