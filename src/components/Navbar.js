import { useState, useEffect } from "react";
import CheckLanguage from "./helpers/LanguageQuery";
import { nav_freQuery, nav_engQuery } from "./helpers/queries";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import fetchData from "./helpers/Fetcher";
import useSWR from "swr";

const q = {
    fr: nav_freQuery,
    "en-US": nav_engQuery,
};

function Navbar({ setLang, lang = "fr", setIsDarkMode, isDarkMode }) {
    const [click, setClick] = useState(false);
    const [page, setPage] = useState(null);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const { data } = useSWR(["nav", lang], async () => {
        const query = q[lang];
        return await fetchData({ query });
    });

    useEffect(() => {
        isDarkMode
            ? document.body.classList.add("darkmode")
            : document.body.classList.remove("darkmode");
    }, [isDarkMode]);

    useEffect(() => {
        if (data) {
            setPage(data.navbarCollection.items[0].navbar);
        }
    }, [data]);

    if (!page) {
        return;
    }

    return (
        <>
            <nav className="navbar">
                <ul className="nav-logo">
                    <li>
                        <NavLink
                            to="/"
                            className="nav-links-first"
                            onClick={closeMobileMenu}
                        >
                            Meta
                        </NavLink>
                    </li>
                </ul>
                <div className="menu-icon" onClick={handleClick}>
                    <div className={click ? "is-opened" : "hamburger"}>
                        <svg className="hamburger">
                            <line
                                x1="0"
                                y1="50%"
                                x2="100%"
                                y2="50%"
                                className="hamburger__bar hamburger__bar--top"
                            />
                            <line
                                x1="0"
                                y1="50%"
                                x2="100%"
                                y2="50%"
                                className="hamburger__bar hamburger__bar--mid"
                            />
                            <line
                                x1="0"
                                y1="50%"
                                x2="100%"
                                y2="50%"
                                className="hamburger__bar hamburger__bar--bot"
                            />
                        </svg>
                    </div>
                </div>
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <li className="nav-item">
                        <NavLink
                            to="/atelier"
                            className="nav-links"
                            onClick={closeMobileMenu}
                        >
                            {page[0]}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="/residences"
                            className="nav-links"
                            onClick={closeMobileMenu}
                        >
                            {page[1]}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="/productions"
                            className="nav-links"
                            onClick={closeMobileMenu}
                        >
                            {page[2]}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="/events"
                            className="nav-links"
                            onClick={closeMobileMenu}
                        >
                            {page[3]}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="/contact"
                            className="nav-links"
                            onClick={closeMobileMenu}
                        >
                            {page[4]}
                        </NavLink>
                    </li>
                </ul>
                <button
                    id="toggleMode"
                    onClick={() => setIsDarkMode((active) => !active)}
                >
                    <img
                        alt="toggle-dark-mode"
                        src={
                            isDarkMode ? "./mode-dark.svg" : "./mode-light.svg"
                        }
                    />
                </button>
                <CheckLanguage setLang={setLang} />
            </nav>
        </>
    );
}

export default Navbar;
