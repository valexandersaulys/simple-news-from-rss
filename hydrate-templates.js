const nunjucks = require("nunjucks");

nunjucks.configure("templates"); // , { autoescape: true });
// nunjucks.render('index.html', { foo: 'bar' });

const hydrateItem = async (feedItem) => {
  return {
    ...feedItem,
    renderedHtml: await nunjucks.render("article.jinja2", feedItem),
  };
};

const hydrateHtml = async (feed) => {
  return {
    feedName: feed.feedName,
    feedLinks: await Promise.all(feed.feedLinks.map(hydrateItem)),
  };
};

module.exports = {
  hydrateHtml,
};
