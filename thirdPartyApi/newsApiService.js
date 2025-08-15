const axios = require("axios");
const baseUrl = "https://newsapi.org/v2";

const apiKey = process.env.API_KEY;

const getAllPreferencesNews = async () => {
  try {
    const url = `${baseUrl}/top-headlines?sources=bbc-news&apiKey=${apiKey}`;
    const news = await axios.get(url);
    return {
      status: news.data.status,
      totalResults: news.data.totalResults,
      articles: news.data.articles,
    };
  } catch (err) {
    throw new Error(err);
  }
};

const getNewsBasedOnPreferences = async (preferences) => {
  try {
    let endpoint = "/top-headlines/sources";

    let queryParams = ``;

    const sourceNews = {
      category: preferences?.category,
      language: preferences?.language,
      country: preferences?.country,
    };

    if (sourceNews.category) {
      queryParams = `&category=${sourceNews.category}`;
    }

    if (sourceNews.language) {
      queryParams = `&language=${sourceNews.language}`;
    }

    if (sourceNews.country) {
      queryParams = `&country=${sourceNews.country}`;
    }

    const url = `${baseUrl}${endpoint}?${queryParams}&apiKey=${apiKey}`;

    const news = await axios.get(url);

    if (news.data.sources.length <= 0) {
      return { msg: "no source news found ", status: 404 };
    }

    return news.data;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAllPreferencesNews,
  getNewsBasedOnPreferences,
};
