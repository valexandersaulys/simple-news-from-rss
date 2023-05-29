const fs = require("fs");
const { open, readFile, copyFile } = require("node:fs/promises");

const { retrieveLinks } = require("./retrieve-links");
const { extractArticles } = require("./extract-article");
const { hydrateHtml, createMasterPage } = require("./hydrate-templates");
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
          const [feedName, feedUrl] = feed.split(" ");
          const feedLinks = await retrieveLinks(feedUrl);
          return {
            feedName,
            feedLinks: feedLinks.filter((link) => link)
          };
        })
    )
  )
  .then(async (feeds) => {
    let existingArticles = await readFile("./existingArticles.json", "utf-8");
    existingArticles = JSON.parse(existingArticles);
    return Promise.all(
      feeds.map((feed) => extractArticles(feed, existingArticles))
    );
  })
  .then((feeds) => Promise.all(feeds.map((feed) => hydrateHtml(feed))))
  .then(async (feeds) => {
    await fs.writeFileSync("./existingArticles.json", JSON.stringify(feeds));
    return feeds;
  })
  .then((feeds) => Promise.all(feeds.map((feed) => dumpToDisk(feed))))
  .then((feeds) => createMasterPage(feeds))
  .then(() => {
    // copy over ./templates/styles.css to ./output/styles.css
    copyFile("./templates/styles.css", "./output/styles.css");
  })
  .catch((err) => {
    console.error(err);
  });
