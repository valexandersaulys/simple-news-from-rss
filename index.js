// const fs = require("fs");
const { open, readFile } = require("node:fs/promises");

const { retrieveLinks } = require("./retrieve-links");
const { extractArticles } = require("./extract-article");
const { hydrateHtml } = require("./hydrate-templates");
const { dumpToDisk } = require("./dump-to-disk");

readFile("./feeds.txt", "utf-8")
  .then((feedsFile) => {
    // need to do a split line here before I pass forward
    if (!feedsFile) throw new Error("Could not find feed");
    return feedsFile.split(/\r?\n/);
  })
  .then(async (lines) =>
    Promise.all(
      lines
        .filter((feed) => feed.trim() != "")
        .map(async (feed) => {
          const feedLinks = await retrieveLinks(feed);
          return {
            feedName: feed,
            feedLinks: feedLinks.filter((link) => link),
          };
        })
    )
  )
  .then((feeds) => Promise.all(feeds.map((feed) => extractArticles(feed))))
  .then((feeds) => Promise.all(feeds.map((feed) => hydrateHtml(feed))))
  .then((feeds) => Promise.all(feeds.map((feed) => dumpToDisk(feed))))
  .catch((err) => {
    console.error(err);
  });
