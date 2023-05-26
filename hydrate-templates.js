const fs = require("fs");

const nunjucks = require("nunjucks");

nunjucks.configure("templates"); // , { autoescape: true });
// nunjucks.render('index.html', { foo: 'bar' });

const hydrateItem = async (feedItem) => {
  return {
    ...feedItem,
    renderedHtml: await nunjucks.render("article.jinja2", feedItem)
  };
};

const hydrateHtml = async (feed) => {
  return {
    feedName: feed.feedName,
    feedLinks: await Promise.all(feed.feedLinks.map(hydrateItem))
  };
};

const createMasterPage = async (allFeeds) => {
  const renderedHtml = await nunjucks.render("homepage.jinja2", { allFeeds });
  await fs.writeFileSync("./output/index.html", renderedHtml);

  return Promise.all(
    allFeeds.map(async (feed) => {
      const renderedHtml = await nunjucks.render("feedpage.jinja2", {
        feed
      });
      await fs.writeFileSync(
        `./output/${feed.feedName}/index.html`,
        renderedHtml
      );
    })
  );
};

module.exports = {
  hydrateHtml,
  createMasterPage
};
