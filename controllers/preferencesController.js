const axios = require("axios");
const baseUrl = "https://newsapi.org/v2";

const apiKey = process.env.API_KEY;

const getAllPreferences = async (req, res) => {
  try {
    const url = `${baseUrl}/top-headlines?sources=bbc-news&apiKey=${apiKey}`;
    const news = await axios.get(url);
    res.status(200).json({
      status: news.data.status,
      totalResults: news.data.totalResults,
      articles: news.data.articles,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBasedOnSourcePreferences = async (req, res) => {
  try {
    let endpoint = "/top-headlines/sources";

    let queryParams = ``;

    const sourceNews = {
      category: req.body?.category,
      language: req.body?.language,
      country: req.body?.country,
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
      return next({ msg: "no source news found ", status: 404 });
    }

    res.status(200).send(news.data);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  getAllPreferences,
  getBasedOnSourcePreferences,
};
