import { useState, useEffect } from "react";
import CheckLanguage from "./helpers/LanguageQuery";
import { nav_freQuery, nav_engQuery } from "./helpers/queries";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

let SPACE_ID, ACCESS_TOKEN;
if (process.env.NODE_ENV === "production") {
    SPACE_ID = process.env.REACT_APP_SPACE_ID;
    ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
} else {
    SPACE_ID = require("../secrets.json").REACT_APP_SPACE_ID;
    ACCESS_TOKEN = require("../secrets.json").REACT_APP_ACCESS_TOKEN;
}

const q = {
    fr: nav_freQuery,
    "en-US": nav_engQuery,
};

function Navbar({ setLang, lang = "fr" }) {
    const [click, setClick] = useState(false);
    const [page, setPage] = useState(null);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${ACCESS_TOKEN}`,
                        },
                        body: JSON.stringify({ query: q[lang] }),
                    }
                );
                const { data, errors } = await response.json();
                if (errors) {
                    console.error(errors);
                    return;
                }
                setPage(data.navbarCollection.items[0].navbar);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [lang]);

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
                            className="nav-links"
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
                <CheckLanguage setLang={setLang} />
            </nav>
        </>
    );
}

export default Navbar;
