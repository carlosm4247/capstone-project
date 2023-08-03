import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/news", async (req, res) => {

  const { query, loggedIn, page } = req.query;
  let constructedQuery = ""

  try {
    const apiKey = "VZG8IbDUv3wiOAQ96dSlfFC5ZSE2p6qeA5a7GBEaRoU";
    const apiUrl = "https://api.newscatcherapi.com/v2/search";

    const baseParams = {
        lang: "en", 
        countries: "US", 
        topic: "politics",
        sort_by: "date",
        page_size: 20
    };

    if (loggedIn === "false") {
        baseParams.sources = "foxnews.com,wsj.com,nytimes.com,cnn.com,npr.org,washingtonpost.com,apnews.com,msnbc.com";
    }

    const parsedQuery = JSON.parse(query);

    if (loggedIn === "true") {
        constructedQuery = parsedQuery.map((tag) => `"${tag}"`).join(" OR ");
    } else {
        constructedQuery = "politics";
    }

    const params = { ...baseParams, q: constructedQuery, page: page || 1 };

    const response = await axios.get(apiUrl, {
        params,
        headers: {
          "x-api-key": apiKey,
        },
    });

    const articles = response.data.articles;
    const totalPages = response.data.total_pages;

    res.json({ articles, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;