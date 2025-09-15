import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatDistanceToNowStrict } from "date-fns";
import { toast } from "react-toastify";

import api from "../services/api";
import AuthContext from "../context/AuthContext";
import VPCard from "../components/VPCard";

import "../styles/VideoPlayer.css";

const VideoPlayer = () => {

    const { videoId } = useParams();

    const { user } = useContext(AuthContext);
    const [video, setVideo] = useState(null);
    const [videos, setVideos] = useState([]);
    const [relatedVideos, setRelatedVideos] = useState([]);
    const [channelAvatar, setChannelAvatar] = useState("");
    const [commentText, setCommentText] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to extract YouTube video ID from a given URL.
    const getYouTubeId = (url) => {
        try {
            const parsed = new URL(url);  
            return parsed.searchParams.get("v");
        } 
        catch {
            return null;
        }
    };

    // Fetch Video by videoId.
    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await api.get(`/videos/${videoId}`);
                setVideo(response.data);
            }
            catch(error) {
                toast.error(error.response?.data?.message || "Failed to fetch video..");
                setError("Failed to fetch video.");
            }
            finally {
                setLoading(false);
            }
        };
        fetchVideo();
    }, [videoId]);

    // Fetches channel avatar url once the video data is available.
    useEffect(() => {
        if (!video) return;

        const fetchChannel = async () => {
            try {
                const response = await api.get(`/channels/${video.channelId}`);
                setChannelAvatar(response.data?.channelAvatarURL);
            }
            catch(error) {
                // Silently ignore the errors
            }
        };
        fetchChannel();
    }, [video]);

    // Function to add a comment to the video.
    const handleAddComment = async (e) => {
        e.preventDefault();

        if(!user) {
            toast.warn("Please login to add a comment.");
            return;
        }
        
        try {            
            const token = localStorage.getItem("token");
            const response = await api.post('/videos/addComment', {
                videoId, userId: user.userId, commentText
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success(response.data?.message || "Comment added successfully..");
            const updatedVideo = await api.get(`/videos/${videoId}`);
            setVideo(updatedVideo.data);
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Failed to add comment..");
        }
        finally {
            setCommentText("");     // clear input after submission
        }
    };

    // Function to delete a comment from the video.
    const handleDeleteComment = async (commentId) => {
        try {            
            const token = localStorage.getItem("token");
            const response = await api.delete('/videos/deleteComment', {
                data: { videoId, userId: user.userId, commentId },
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success(response.data?.message || "Comment deleted successfully..");
            const updatedVideo = await api.get(`/videos/${videoId}`);
            setVideo(updatedVideo.data);
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete comment..");
        }
    };

    // Fetches all Videos.
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await api.get('/videos');
                setVideos(response.data);
            }
            catch(error) {
                // Silently ignore the errors
            }
        };
        fetchVideos();
    }, []);

    // Filter and set related videos.
    useEffect(() => {
        if (!video || !videos ) return;
        const relatedVideosData = videos.filter((v) => v.videoId !== videoId && v.category?.some((cat) => video.category?.includes(cat)) );
        setRelatedVideos(relatedVideosData);
    }, [video, videos]);

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
        <section className="video-player">
            {/* Main Video */}
            <div className="vp-main">
                <div className="vp-div1">
                    <iframe className="vp-iframe" src={`https://www.youtube.com/embed/${getYouTubeId(video.videoUrl)}`}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture" allowFullScreen
                    ></iframe>
                    <h2> {video.title} </h2>
                    <div className="vp-div4">
                        <div className="vp-div5">
                            { channelAvatar && <img src={channelAvatar} /> }
                            <Link to={`/channel/${video.channelId}`}> <h1> {video.channelId} </h1> </Link>
                            <button id="sc-btn"> Subscribe </button>
                        </div>
                        <div className="vp-btns">
                            <div className="ld-btn">
                                <button id="like-btn" className="vp-btn"> <i className="fa-regular fa-thumbs-up"></i> {video.likes} </button>
                                <button id="dislike-btn" className="vp-btn"> {video.dislikes} <i className="fa-regular fa-thumbs-down fa-flip-horizontal"></i> </button>
                            </div>
                            <button id="share-btn" className="vp-btn"> <i className="fa-solid fa-share"></i> Share </button>
                            <button id="dsr-btn" className="vp-btn"> <i className="fa-solid fa-ellipsis"></i> </button>
                        </div>
                    </div>
                </div>
                {/* - */}
                <div className="vp-div2">
                    <i> {video.views} views • { formatDistanceToNowStrict(new Date(video.uploadDate)) } ago </i>
                    <p> {video.description} </p>
                </div>
                {/* - */}
                <div className="vp-div3">
                    <h5> {video.comments.length} Comments </h5>
                    <form onSubmit={handleAddComment} className="comment-form">
                        <input type="text" placeholder="Add a comment..." value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                        <button type="submit" id="ac-btn" disabled={!commentText.trim()}> <i className="fa-solid fa-paper-plane"></i> </button>
                    </form>
                    { video.comments.length == 0 ? (
                        <p> No comments yet. </p>
                    ) : (
                        video.comments.map((comment) => ( <div key={comment.commentId} className="comment">
                            <p> {comment.userId} • <span> { formatDistanceToNowStrict(new Date(comment.timestamp)) } ago </span> </p>
                            <p> 
                                {comment.text} {" "}
                                { user && comment.userId == user.userId && (
                                    <button id="dc-btn" onClick={() => handleDeleteComment(comment.commentId)}> <i className="fa-regular fa-trash-can fa-sm"></i> </button>
                                ) }
                            </p>
                        </div> ))
                    ) }
                </div>
            </div>
            {/* Related videos */}
            <div className="vp-related">
                { relatedVideos.length == 0 ? (
                    <p> No related videos found. </p>
                ) : (
                    relatedVideos.map((video) => <VPCard key={video._id} video={video} /> )
                ) }
            </div>
        </section>
    );

};
    
export default VideoPlayer;


