const { extract } = require("@extractus/article-extractor");

const extractArticle = async (feedItem, existingArticlesForFeed) => {
  // if article already has been downloaded previously, skip it
  if (
    existingArticlesForFeed &&
    existingArticlesForFeed.feedLinks.filter((x) => x.link === feedItem.link)
      .length > 0
  )
    return existingArticlesForFeed.feedLinks.filter(
      (x) => x.link == feedItem.link
    )[0];
  else {
    const article = await extract(feedItem.link);
    return {
      ...feedItem,
      article_body: article.content
    };
  }
};

const extractArticles = async (feed, existingArticles) => {
  let existingArticlesForFeed = existingArticles.filter(
    (x) => x.feedName == feed.feedName
  );
  existingArticlesForFeed =
    existingArticlesForFeed.length > 0 ? existingArticlesForFeed[0] : null;
  return {
    feedName: feed.feedName,
    feedLinks: await Promise.all(
      feed.feedLinks.map((feedLink) =>
        extractArticle(feedLink, existingArticlesForFeed)
      )
    )
  };
};

module.exports = {
  extractArticles
};
