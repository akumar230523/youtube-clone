import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";
import AuthContext from "../context/AuthContext";

import "../styles/Form.css";

const UploadVideo = () => {

    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({ title: "", thumbnailUrl: "", videoUrl: "", description: "", category: "" });

    const navigate = useNavigate();

    // Set Form Data.
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // Function to Upload Video.
    const handleUploadVideo = async (e) => {
        e.preventDefault();

        const { title, thumbnailUrl, videoUrl, description, category } = formData;
        if (!title || !thumbnailUrl || !videoUrl || !description || !category) {
            toast.warn("Please fill out all fields..");
            return;
        }
        
        try {
            const token = localStorage.getItem("token");
            const response = await api.post('/videos/upload', { 
                title, thumbnailUrl, videoUrl, description, category: category.split(',').map(c => c.trim().toLowerCase()), channelId: user.channels[0], uploader: user.userId 
            }, {
                headers: { Authorization: `Bearer ${token}` } 
            });
            toast.success(response.data?.message || "Video uploaded Successfully..");
            navigate('/profile');
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Failed to upload video..");
        }
    };

    return (
        <section className="UploadVideo">
            <form onSubmit={handleUploadVideo}>
                <h2> <i className="fa-brands fa-youtube"></i> Upload Video </h2>
                <input type="text" placeholder="Title" name="title" value={formData.title} onChange={handleChange} />
                <input type="text" placeholder="Thumbnail URL" name="thumbnailUrl" value={formData.thumbnailUrl} onChange={handleChange} />
                <input type="text" placeholder="Video URL" name="videoUrl" value={formData.videoUrl} onChange={handleChange} />
                <textarea placeholder="Description" name="description" value={formData.description} onChange={handleChange} />
                <input type="text" placeholder="Category (e.g. games, chess)" name="category" value={formData.category} onChange={handleChange} />
                <button type="submit" className="f-btn"> Upload Video </button>
                <hr className="w-2xs" />
                <Link to='/profile' className="f-btn"> Cancel </Link>
            </form>
        </section>
    );

};

export default UploadVideo;