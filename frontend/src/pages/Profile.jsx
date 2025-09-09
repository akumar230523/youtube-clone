import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";
import AuthContext from "../context/AuthContext";
import ProfileCard from "../components/ProfileCard";

import "../styles/Profile.css";

const Profile = () => {

    const {user, setUser} = useContext(AuthContext);
    const [channel, setChannel] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Fetch user's Channel by channelId and channel's Videos by videoId.
    useEffect(() => {
        if (!user?.channels?.length) {
            setLoading(false);
            return;
        }

        const loadProfile = async () => {
            try {
                const response1 = await api.get(`channels/${user.channels[0]}`);     // Fetch channel data
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
                toast.error("Oops! Something went wrong.");
                setError("Oops! Something went wrong.")
            }
            finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [user]);

    // Function to Delete Channel.
    const handleDeleteChannel = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this channel?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");
            const response = await api.delete(`/channels/delete/${user.channels[0]}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success(response.data?.message || "Channel deleted successfully..");
            localStorage.setItem("user", JSON.stringify(response.data?.user));
            setUser(response.data?.user);
            setChannel(null);
            setVideos([]);
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete channel..");
        }
    };

    // Handle Sign Out.
    const handleSignOut = () => {
        setUser(null); setChannel(null); setVideos([]);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.success("Signed out successfully..");
        navigate('/');
    };

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
        <section className="profile">
            {/* Profile Information */}
            <div className="p-info">
                <img src={user?.avatarURL} />
                <div className="pi-div1">
                    <div className="pi-div2">
                        { channel ? (
                            <h2> {channel.channelName} </h2>
                        ) : (
                            <p className="text-red-500"> No Channel ! </p>
                        ) }
                        <div className="pi-div4">
                            <button className="p1-btn" onClick={handleSignOut}> Sign Out <i className="fa-solid fa-arrow-right-from-bracket"></i> </button>
                            { channel && ( <button className="p1-btn" onClick={handleDeleteChannel}> <i className="fa-solid fa-trash"></i> </button> ) }
                        </div>
                    </div>
                    <p> Username: @{user?.username} </p>
                    <p> Email: {user?.email} </p>
                    <div className="pi-div3">
                        { channel ? (
                            <>
                                <Link to={`/channel/${user.channels[0]}`} className="p2-btn"> <i className="fa-solid fa-eye"></i> View Channel </Link>
                                <Link to={`/update-channel/${user.channels[0]}`} className="p2-btn"> <i className="fa-solid fa-pen-to-square"></i> Edit Channel </Link>
                            </>
                        ) : (
                            <Link to='/create-channel' className="p2-btn"> Create Channel </Link>
                        ) }
                    </div>
                </div>
            </div>
            {/* Profile Videos */}
            <div className="p-videos">
                <div className="pv-div1">
                    <h3> Manage Videos </h3>
                    { channel && ( <Link to='/upload-video' className="p3-btn"> Upload <i className="fa-solid fa-video"></i> </Link> ) }
                </div>
                <hr />
                <div className="pv-div2">
                    { channel ? (
                        <>
                            { videos.length == 0 ? (
                                <i> No videos uploaded yet. </i>
                            ) : (
                                videos.map(video => <ProfileCard key={video._id} video={video} />)
                            ) }
                        </>
                    ) : (
                        <i> Please create a channel to upload videos. </i>
                    ) }
                </div>
            </div>
            {/*  */}
        </section>
    );

};

export default Profile;
