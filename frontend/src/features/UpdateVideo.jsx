import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";
import "../styles/Form.css";

const UpdateVideo = () => {

    const [form, setForm] = useState({ title: "", thumbnailUrl: "", videoUrl: "", category: "", description: "" });

    const { videoId } = useParams();
    const navigate = useNavigate();

    // Set Form Data.
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // Function to Update Video.
    const handleUpdateVideo = async (e) => {
        e.preventDefault();

        const { title, thumbnailUrl, videoUrl, description, category } = form;
        if (!title || !thumbnailUrl || !videoUrl || !description || !category) {
            toast.warn("Please fill out all fields..");
            return;
        }
        
        try {
            const token = localStorage.getItem("token");
            const response = await api.put(`/videos/update/${videoId}`, { 
                title, thumbnailUrl, videoUrl, category: category.split(',').map(c => c.trim().toLowerCase()), description
            }, {
                headers: { Authorization: `Bearer ${token}` } 
            });
            toast.success(response.data?.message || "Video updated successfully..");
            navigate('/profile');
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Failed to update video..");
        }
    };

    return (
        <section className="UpdateVideo">
            <form onSubmit={handleUpdateVideo}>
                <h2> <i className="fa-brands fa-youtube"></i> Update Video </h2>
                <input type="text" placeholder="Title" name="title" value={form.title} onChange={handleChange} />
                <input type="text" placeholder="Thumbnail URL" name="thumbnailUrl" value={form.thumbnailUrl} onChange={handleChange} />
                <input type="text" placeholder="Video URL" name="videoUrl" value={form.videoUrl} onChange={handleChange} />
                <textarea placeholder="Description" name="description" value={form.description} onChange={handleChange} />
                <input type="text" placeholder="Category (e.g. games, chess)" name="category" value={form.category} onChange={handleChange} />
                <button type="submit" className="f-btn"> Update Video </button>
                <hr className="w-2xs" />
                <Link to='/profile' className="f-btn"> Cancel </Link>
            </form>
        </section>
    );

};

export default UpdateVideo;

