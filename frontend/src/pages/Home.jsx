import { useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import api from "../services/api";
import HomeCard from "../components/HomeCard";
import SearchContext from "../context/SearchContext";

import "../styles/Home.css";

const Home = () => {

    const [videos, setVideos] = useState([]);
    const [homeVideos, setHomeVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchCategory, setSearchCategory] = useState("all");
    const {searchText, setSearchText } = useContext(SearchContext);

    // Fetch all Videos.
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await api.get(`/videos`);
                setVideos(response.data);
                setHomeVideos(response.data);
            }
            catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch videos..");
                setError("Failed to fetch videos.");
            }
            finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, []);

    // Extract unique categories.
    const videoCategories = useMemo(() => [
        "all", ...new Set(videos.flatMap(video => video?.category))
    ], [videos]);

    // Filter videos based on search text and category.
    useEffect(() => {
        const filteredVideos = videos.filter(video => {
            const matchesSearch = video?.title?.toLowerCase().includes(searchText.toLowerCase()) || video?.uploader?.toLowerCase().includes(searchText.toLowerCase());
            const matchesCategory = searchCategory === "all" || video?.category?.includes(searchCategory);
            return matchesSearch && matchesCategory;
        });
        setHomeVideos(filteredVideos);
    }, [searchText, searchCategory, videos]);

    // Loading State
    if (loading) return (
        <div className="loading">
            <i className="fa-solid fa-spinner fa-spin-pulse"></i>
            <p> loading </p>
        </div>
    );

    // Error State
    if (error) return (
        <div className="error">
            <b> <i className="fa-solid fa-circle-exclamation fa-fade" style={{color: "#fa3232"}}></i> </b>
            <p> {error} </p>
        </div>
    );

    return (
        <section className="home">
            {/* Videos Category Button */}
            <nav className="category">
                { videoCategories.map(cat => (
                    <button key={cat} className={searchCategory == cat ? "active" : ""} onClick={() => { setSearchCategory(cat); setSearchText(""); }}>
                        {cat}
                    </button>
                )) }
            </nav>
            {/* Home Videos */}
            <div className="home-videos">
                { homeVideos.length == 0 ? (
                    <i> No videos match your search. </i>
                ) : (
                    homeVideos.map(video => <HomeCard key={video._id} video={video} />)
                ) }
            </div>
            {/*  */}
        </section>
    );

};

export default Home;

