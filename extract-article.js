const { extract } = require("@extractus/article-extractor");

const extractArticle = async (feedItem) => {
  const article = await extract(feedItem.link);
  return {
    ...feedItem,
    article_body: article.content,
  };
};

const extractArticles = async (feed) => {
  return {
    feedName: feed.feedName,
    feedLinks: await Promise.all(feed.feedLinks.map(extractArticle)),
  };
};

module.exports = {
  extractArticles,
};
