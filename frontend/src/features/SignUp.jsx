import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";

import "../styles/Form.css";

const SignUp = () => {

    const [form, setForm] = useState({ username: "", email: "", password: "", avatarURL: "" });

    const navigate = useNavigate();

    // Set Form Data.
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handle Sign Up.
    const handleSignUp = async (e) => {
        e.preventDefault();

        const { username, email, password, avatarURL } = form;
        if (!username || !email || !password || !avatarURL) {
            toast.warn("Please fill out all fields..");
            return;
        }

        try {
            const response = await api.post('/users/signup', { username, email, password, avatarURL });
            toast.success(response.data?.message || "Signed up successfully..");
            navigate('/signin');
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Sign up failed. Please try again..");
        }
    };

    return (
        <section className="SignUp">
            <form onSubmit={handleSignUp}>
                <h2> <i className="fa-brands fa-youtube"></i> Sign Up </h2>
                <input type="text" placeholder="Username" autoComplete="username" name="username" value={form.username} onChange={handleChange} />
                <input type="email" placeholder="Email" autoComplete="email" name="email" value={form.email} onChange={handleChange} />
                <input type="password" placeholder="Password" autoComplete="new-password" name="password" value={form.password} onChange={handleChange} />
                <input type="url" placeholder="Avatar URL" autoComplete="off" name="avatarURL" value={form.avatarURL} onChange={handleChange} />
                <button type="submit" className="f-btn"> Sign Up </button>
                <hr />
                <Link to='/' className="f-btn"> Cancel </Link>
            </form>
        </section>
    );

};

export default SignUp;


