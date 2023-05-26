const { randomUUID } = require("crypto");

const Parser = require("rss-parser");
const parser = new Parser();

const retrieveLinks = async (link) => {
  /**
   * retrieve all links and store in JSON of format
   * [ { title: "", link: "", pubDate: new Date()
   */
  console.log("Parsing feeds from:  ", link.trim());
  let feed = await parser.parseURL(link.trim());
  let allLinks = feed.items.map((item) => ({
    link: item.link,
    title: item.title,
    author: item.author || item.creator,
    pubDate: new Date(item.pubDate),
    linkUuid: randomUUID(),
  }));
  return allLinks;
};

module.exports = {
  retrieveLinks,
};
