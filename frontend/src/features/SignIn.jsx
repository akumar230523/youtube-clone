import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";
import AuthContext from "../context/AuthContext";

import "../styles/Form.css";

const SignIn = () => {

    const {setUser} = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    // Handle Sign In.
    const handleSignIn = async (e) => {
        e.preventDefault();
        
        if (!username || !password) {
            toast.warn("Please fill out all fields..");
            return;
        }

        try {
            const response = await api.post('/users/signin', { username, password });
            toast.success(response.data?.message || "Signed in successfully..");
            localStorage.setItem("token", response.data?.token);
            localStorage.setItem("user", JSON.stringify(response.data?.user));
            setUser(response.data?.user);
            navigate('/');
        } 
        catch (error) {
            toast.error(error.response?.data?.message || "Sign in failed. Please try again..");
        }
    };

    return (
        <section className="SignIn">
            <form onSubmit={handleSignIn}>
                <h2> <i className="fa-brands fa-youtube"></i> Sign In </h2>
                <input type="text" placeholder="Username" autoComplete="username" name="username" value={username} onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" autoComplete="current-password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit" className="f-btn"> Sign In </button>
                <hr />
                <Link to='/signup' className="f-btn"> Sign Up </Link>
            </form>
        </section>
    );

};

export default SignIn;