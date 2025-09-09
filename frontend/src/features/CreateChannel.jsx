import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";
import AuthContext from "../context/AuthContext";

import "../styles/Form.css";

const CreateChannel = () => {

    const {user, setUser} = useContext(AuthContext);
    const [form, setForm] = useState({ channelName: "", description: "", channelBannerURL: "", channelAvatarURL: "" });

    const navigate = useNavigate();

    // Set Form Data.
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Function to Create Channel.
    const handleCreateChannel = async (e) => {
        e.preventDefault();
        
        const { channelName, description, channelBannerURL, channelAvatarURL } = form;
        if (!channelName || !description || !channelBannerURL || !channelAvatarURL) {
            toast.warn("Please fill out all fields..");
            return;
        }
        
        try {
            const token = localStorage.getItem("token");
            const response = await api.post('/channels/create', {
                channelName, owner: user.userId, description, channelBannerURL, channelAvatarURL
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success(response.data?.message || "Channel created successfully..");
            localStorage.setItem("user", JSON.stringify(response.data?.user));
            setUser(response.data?.user);
            navigate('/profile');
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Failed to create channel! Please try again..");
        }
    };

    return (
        <section className="CreateChannel">
            <form onSubmit={handleCreateChannel}>
                <h2> <i className="fa-brands fa-youtube"></i> Create Channel </h2>
                <input type="text" placeholder="Channel Name" name="channelName" value={form.channelName} onChange={handleChange} />
                <input type="text" placeholder="Description (1-2 line)" name="description" value={form.description} onChange={handleChange} />
                <input type="url" placeholder="Channel Banner URL" name="channelBannerURL" value={form.channelBannerURL} onChange={handleChange} />
                <input type="url" placeholder="Channel Avatar URL" name="channelAvatarURL" value={form.channelAvatarURL} onChange={handleChange} />
                <button type="submit" className="f-btn"> Create Channel </button>
                <hr className="w-2xs" />
                <Link to='/profile' className="f-btn"> Cancel </Link>
            </form>
        </section>
    );

};

export default CreateChannel;



