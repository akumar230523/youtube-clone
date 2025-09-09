import { useContext } from "react";
import { Link } from "react-router-dom";

import SidebarContext from "../context/SidebarContext";

import "../styles/Sidebar.css";

const Sidebar = () => {

    const {isSidebar} = useContext(SidebarContext);

    return (
        <aside className={ isSidebar ? "open" : "close" }>
            {/* Icon navigation */}
            <nav className="nav1">
                <Link to='/' className="n1"> <i className="fa-solid fa-house"></i> </Link>
                <Link to='/' className="n1"> <i className="fa-solid fa-bolt"></i> </Link>
                <Link to='/' className="n1"> <i className="fa-solid fa-clapperboard"></i> </Link>
                <Link to='/' className="n1"> <i className="fa-solid fa-clock-rotate-left"></i> </Link>
            </nav>
            {/* Labeled navigation */}
            <nav className="nav2">
                <Link to='/' className="n2"> <i className="fa-solid fa-house"></i> Home </Link>
                <Link to='/' className="n2"> <i className="fa-solid fa-bolt"></i> Shorts </Link>
                <Link to='/' className="n2"> <i className="fa-solid fa-clapperboard"></i> Subscriptions </Link>
                <Link to='/' className="n2"> <i className="fa-solid fa-clock-rotate-left"></i> History </Link>
                <hr />
                <b> Explore </b>
                <Link to='/' className="n2"> <i className="fa-solid fa-fire"></i> Trending </Link>
                <Link to='/' className="n2"> <i className="fa-solid fa-music"></i> Music </Link>
                <Link to='/' className="n2"> <i className="fa-solid fa-film"></i> Films </Link>
                <Link to='/' className="n2"> <i className="fa-solid fa-gamepad"></i> Gaming </Link>
                <Link to='/' className="n2"> <i className="fa-regular fa-newspaper"></i> News </Link>
                <Link to='/' className="n2"> <i className="fa-solid fa-trophy"></i> Sport </Link>
                <Link to='/' className="n2"> <i className="fa-solid fa-graduation-cap"></i> Courses </Link>
                <Link to='/' className="n2"> <i className="fa-solid fa-podcast"></i> Podcasts </Link>
                <hr />
                <Link to='/' className="n2"> <i className="fa-solid fa-gear"></i> Settings </Link>
                <Link to='/' className="n2"> <i className="fa-regular fa-flag"></i> Report history </Link>
                <Link to='/' className="n2"> <i className="fa-solid fa-question"></i> Help </Link>
                <Link to='/' className="n2"> <i className="fa-solid fa-exclamation"></i> Send feedback </Link>
                <hr />
                <p id="copyright"> &#169; 2025 YouTube </p>
            </nav>
            {/*  */}
        </aside>
    );
    
};

export default Sidebar;



