import { useState, useEffect, useContext, useRef } from "react";
import "./Feed.css"
import { UserContext } from "../../UserContext";

export default function Feed ( { loggedin }) {

    const [articles, setArticles] = useState([]);
    const [searchQuery, setSearchQuery] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const user = useContext(UserContext);

    const currentUser = user.user;

    const [isFetching, setIsFetching] = useState(false);
    const fetchTimerRef = useRef(null);

    const fetchData = async (page) => {
      try {
        const url = `http://localhost:3001/news?query=${JSON.stringify(searchQuery)}&loggedIn=${loggedin}&page=${page}`;

        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (data.articles && typeof data.articles === 'object') {
          const articlesArray = Object.values(data.articles);
          if (Array.isArray(articlesArray)) {
            setArticles((prevArticles) => [...prevArticles, ...articlesArray]);
          } else {
            setArticles([]);
          }
        } else {
          setArticles([]);
        }

        setTotalPages(data.totalPages);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      if (loggedin) {
        const tagsArray = Object.values(currentUser.stances).map(([tag, option]) => tag);
        setSearchQuery(tagsArray.concat(currentUser.following));
      }
    }, [loggedin, user.stances, user.following]);

    useEffect(() => {
      setCurrentPage(1);
      fetchData(1);
    }, [searchQuery]);

    useEffect(() => {
      if (isFetching && fetchTimerRef.current) {
        clearTimeout(fetchTimerRef.current);
      }
      setIsFetching(true);
      fetchTimerRef.current = setTimeout(() => {
        fetchData(currentPage);
        setIsFetching(false);
      }, 1000);

      return () => {
        if (fetchTimerRef.current) {
          clearTimeout(fetchTimerRef.current);
        }
      };
    }, [searchQuery, currentPage]);

    const handleLoadMore = () => {
      if (currentPage < totalPages) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    const LoadingFallback = () => {
      return <div className="loading-spinner"></div>
    }

    return (
        <div className="feed-container">
            <h3>Feed</h3>
            <ul>
                {articles ? (articles
                .filter((article, index, self) =>
                index === self.findIndex((a) => a.title === article.title)
                )
                .map((article, index) => (
                    <div key={index} className="article-container">
                        <div className="article-content">
                            <a href={article.link} target="_blank" className="article-title">{article.title}</a>
                            <p className="article-info">{article.published_date} | By: {article.author}</p>
                            <p className="article-description">{article.excerpt}</p>
                        </div>
                    </div>
                ))) : (
                    <p>No articles right now, check later or refresh the page.</p>
                )}
            </ul>
            {isFetching && <LoadingFallback />}
            {currentPage < totalPages && (
              <button onClick={handleLoadMore}>Load More</button>
            )}
        </div>
    )
}