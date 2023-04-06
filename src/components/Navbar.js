import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CheckLanguage from "./helpers/LanguageQuery";
import "./Navbar.css";
import { nav_freQuery, nav_engQuery } from "./helpers/queries";

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
        const query = q[lang];

        window
            .fetch(
                `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                    },
                    body: JSON.stringify({ query }),
                }
            )
            .then((response) => response.json())
            .then(({ data, errors }) => {
                if (errors) {
                    console.error(errors);
                }
                setPage(data.navbarCollection.items[0].navbar);
            });
    }, [lang]);

    if (!page) {
        return;
    }

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    {/* <Link
                        to="/"
                        className="navbar-logo"
                        onClick={closeMobileMenu}
                    >
                        <h1 className="nav-item">Meta</h1>
                        <img src="./logo_meta.png" alt="Meta" />
                    </Link> */}
                    <ul className="nav-logo">
                        <li>
                            <Link
                                to="/"
                                className="nav-links"
                                onClick={closeMobileMenu}
                            >
                                Meta
                            </Link>
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
                            <Link
                                to="/atelier"
                                className="nav-links"
                                onClick={closeMobileMenu}
                            >
                                {page[0]}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/residences"
                                className="nav-links"
                                onClick={closeMobileMenu}
                            >
                                {page[1]}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/productions"
                                className="nav-links"
                                onClick={closeMobileMenu}
                            >
                                {page[2]}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/events"
                                className="nav-links"
                                onClick={closeMobileMenu}
                            >
                                {page[3]}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/contact"
                                className="nav-links"
                                onClick={closeMobileMenu}
                            >
                                {page[4]}
                            </Link>
                        </li>
                    </ul>
                    <CheckLanguage setLang={setLang} />
                </div>
            </nav>
        </>
    );
}

export default Navbar;
