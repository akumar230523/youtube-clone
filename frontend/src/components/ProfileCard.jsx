import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";

import "../styles/Card/ProfileCard.css";

const ProfileCard = ({ video }) => {

    const handleDeleteVideo = async() => {
        const confirmDelete = window.confirm("Are you sure you want to delete this video?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");
            const response = await api.delete(`/videos/delete/${video.videoId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success(response.data?.message || "Video deleted successfully..");
            window.location.reload();
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete video..");
        }
    };

    return (
        <article className="ProfileCard">
            <Link to={`/video/${video.videoId}`}> <img src={video.thumbnailUrl} /> </Link>
            <h4> {video.title} </h4>
            <div className="pc-btns"> 
                <Link to={`/update-video/${video.videoId}`} id="uv-btn"> Update <i className="fa-solid fa-video"></i> </Link>
                <button id="dv-btn" onClick={handleDeleteVideo}> Delete <i className="fa-solid fa-video"></i> </button>
            </div>
        </article>
    );

};

export default ProfileCard;