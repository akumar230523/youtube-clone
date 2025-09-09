import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";
import "../styles/Form.css";

const EditChannel = () => {

    const [form, setForm] = useState({ description: "", channelBannerURL: "", channelAvatarURL: "" });

    const { channelId } = useParams();
    const navigate = useNavigate();
    
    // Set Form Data.
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Function to Edit Channel.
    const handleEditChannel = async (e) => {
        e.preventDefault();

        const { description, channelBannerURL, channelAvatarURL } = form;
        if (!description || !channelBannerURL || !channelAvatarURL) {
            toast.warn("Please fill out all fields..");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await api.put(`/channels/edit/${channelId}`, { 
                description, channelBannerURL, channelAvatarURL 
            }, { 
                headers: { Authorization: `Bearer ${token}` } 
            });
            toast.success(response.data?.message || "Channel edited successfully..");
            navigate('/profile');
        } 
        catch (error) {
            toast.error(error.response?.data?.message || "Failed to edit channel..");
        }
    };

    return (
        <section className="EditChannel">
            <form onSubmit={handleEditChannel}>
                <h2> <i className="fa-brands fa-youtube"></i> Edit Channel </h2>
                <input type="text" placeholder="Description (1-2 line)" name="description" value={form.description} onChange={handleChange} />
                <input type="text" placeholder="Channel Banner URL" name="channelBannerURL" value={form.channelBannerURL} onChange={handleChange} />
                <input type="text" placeholder="Channel Avatar URL" name="channelAvatarURL" value={form.channelAvatarURL} onChange={handleChange} />
                <button type="submit" className="f-btn"> Edit Channel </button>
                <hr className="w-2xs" />
                <Link to='/profile' className="f-btn"> Cancel </Link>
            </form>
        </section>
    );

};

export default EditChannel;



