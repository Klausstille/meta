import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CheckLanguage from "./helpers/LanguageQuery";
import "./Navbar.css";

let SPACE_ID, ACCESS_TOKEN;
if (process.env.NODE_ENV === "production") {
    SPACE_ID = process.env.REACT_APP_SPACE_ID;
    ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
} else {
    SPACE_ID = require("../secrets.json").REACT_APP_SPACE_ID;
    ACCESS_TOKEN = require("../secrets.json").REACT_APP_ACCESS_TOKEN;
}

// const { SPACE_ID, ACCESS_TOKEN } = require("../secrets.json");

const engQuery = `
{
  navbarCollection {
    items {
      navbar(locale:"en-US")
    }
  }
}
`;

const freQuery = `
{
  navbarCollection {
    items {
      navbar(locale: "fr")
    }
  }
}
`;

const q = {
    fr: freQuery,
    "en-US": engQuery,
};

function Navbar({ setLang, lang = "fr" }) {
    const [click, setClick] = useState(false);
    const [page, setPage] = useState(null);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    useEffect(() => {
        const query = q[lang];
        console.log({ lang });
        console.log(query);
        console.log("SPACE_ID", SPACE_ID);
        console.log(process.env.NODE_ENV);

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
                console.log(
                    "HELLO NAVBAR DATA",
                    data.navbarCollection.items[0].navbar
                );
                setPage(data.navbarCollection.items[0].navbar);
            });
    }, [lang]);

    if (!page) {
        return "Loading...";
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
                        <i className={click ? "fas fa-times" : "fas fa-bars"} />
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
                                to="/artistes"
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
                        <CheckLanguage setLang={setLang} />
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
