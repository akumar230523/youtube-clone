import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

import AuthContext from './context/AuthContext';
import SearchContext from './context/SearchContext';
import SidebarContext from './context/SidebarContext';
import ThemeContext from './context/ThemeContext';

import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';

import './App.css';

function App() {

    const [user, setUser] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [isSidebar, setIsSidebar] = useState(false);
    const [isTheme, setIsTheme] = useState(true);
    const [loading, setLoading] = useState(true);

    // Restore user from localStorage on app load.
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);
    if (loading) return <div className="loading"> loading... </div>;

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <SearchContext.Provider value={{ searchText, setSearchText }}>
                <SidebarContext.Provider value={{ isSidebar, setIsSidebar }}>
                    <ThemeContext.Provider value={{ isTheme, setIsTheme }}>
                        <div className={isTheme ? "dark" : "light"}>
                            <Header />
                            <div className={`so-div ${isSidebar ? "open" : "close"} `}>
                                <Sidebar />
                                <div className="o-div">
                                    <Outlet />
                                </div>
                            </div>
                            <ToastContainer theme={isTheme ? "dark" : "light"} />
                        </div>
                    </ThemeContext.Provider>
                </SidebarContext.Provider>
            </SearchContext.Provider>
        </AuthContext.Provider>
    );

};

export default App;



