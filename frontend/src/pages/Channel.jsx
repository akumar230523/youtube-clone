import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";
import ChannelCard from "../components/ChannelCard";

import "../styles/Channel.css";

const Channel = () => {

    const { channelId } = useParams();

    const [channel, setChannel] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch Channel by channelId and channel's Videos by videoId.
    useEffect(() => {
        const fetchChannelAndVideos = async () => {
            try {
                const response1 = await api.get(`channels/${channelId}`);     // Fetch channel data
                setChannel(response1.data);
                if (response1.data.videos?.length) {
                    const response2 = await Promise.all(response1.data.videos.map(videoId => 
                        api.get(`videos/${videoId}`)     // Fetch videos data
                    ));
                    const fetchVideos = response2.map(res => res.data);
                    setVideos(fetchVideos);
                }
                else {
                    setVideos([]);
                }
            }
            catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch channel..");
                setError("Failed to fetch channel.");
            }
            finally {
                setLoading(false);
            }
        };
        fetchChannelAndVideos();
    }, [channelId]);

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
        <section className="channel">
            {/* Channel Banner */}
            <div className="c-banner">
                <img src={channel.channelBannerURL} alt="Channel Banner" />
            </div>
            {/* Channel Information */}
            <div className="c-info">
                <img src={channel.channelAvatarURL} />
                <div className="ci-div"> 
                    <h1> {channel.channelName} </h1>
                    <i> <b> @{channel.owner} </b> • {channel.subscribers} subscribers • {channel.videos?.length || 0} videos </i>
                    <p> {channel.description} </p>
                    <button className="c-btn"> Subscribe </button>
                </div>
            </div>
            {/* Channel Videos */}
            <div className="c-videos">
                <nav className="cv-nav">
                    <a href='#home'> Home </a>
                    <a href='#videos'> Videos </a>
                    <a href='#shorts'> Shorts </a>
                    <a href='#playlists'> Playlists </a>
                    <a href='#posts'> Posts </a>
                </nav>
                <hr />
                <div className="cv-div">
                    { videos.length == 0 ? (
                        <i> No videos uploaded on this channel. </i>
                    ) : (
                        videos.map(video => <ChannelCard key={video._id} video={video} />)
                    ) }
                </div>
            </div>
            {/*  */}
        </section>
    );

};

export default Channel;

