import { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import SearchContext from "../context/SearchContext";
import SidebarContext from "../context/SidebarContext";
import ThemeContext from "../context/ThemeContext";

import "../styles/Header.css";

const Header = () => {

    const {user} = useContext(AuthContext);
    const {searchText, setSearchText} = useContext(SearchContext);
    const {isSidebar, setIsSidebar} = useContext(SidebarContext);
    const {isTheme, setIsTheme} = useContext(ThemeContext);

    // Toggles Sidebar 
    const handleSidebar = () => setIsSidebar(!isSidebar);

    // Toggles dark/light Theme
    const handleTheme = () => setIsTheme(!isTheme);

    return (       
        <header>
            {/* Left Div: Logo */}
            <div className="logo">
                <button onClick={handleSidebar}> <i className="fa-solid fa-bars"></i> </button>
                <Link to='/' id="yt"> <i className="fa-brands fa-youtube"></i> YouTube </Link>
            </div>
            {/* Middle Div: Search bar */}
            <div className="search-bar">
                <div className="search-text">
                    <input type="text" placeholder="Search.." value={searchText} onChange={e => setSearchText(e.target.value)} /> 
                    <Link to='/' id="search-btn"> <i className="fa-solid fa-magnifying-glass"></i> </Link>
                </div>
                <div className="search-voice">
                    <Link to='/'> <i className="fa-solid fa-microphone"></i> </Link>
                </div>
            </div>
            {/* Right Div: User actions */}
            <div className="user-actions">
                <button id="theme-btn" onClick={handleTheme}> <i className={` fa-solid ${isTheme?"fa-sun":"fa-moon"} `}></i> </button>
                { user ? (
                    <div className="action">
                        <Link to='/'> <i className="fa-regular fa-bell"></i> </Link>
                        <Link to='/'> <i className="fa-solid fa-ellipsis-vertical"></i> </Link>
                        <Link to={`/profile`} id="link1"> <img src={user.avatarURL} /> </Link>
                    </div>
                ) : (
                    <Link to='/signin' id="link2"> <i className="fa-regular fa-user"></i> Sign In </Link>
                ) }
            </div>
            {/*  */}
        </header>
    );

};

export default Header;