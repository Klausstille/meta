import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CheckLanguage from "./helpers/LanguageQuery";
import "./Navbar.css";

const { SPACE_ID, ACCESS_TOKEN } = require("../secrets.json");

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
                    <Link
                        to="/"
                        className="navbar-logo"
                        onClick={closeMobileMenu}
                    >
                        <img src="./logo_meta.png" alt="Meta" />
                    </Link>
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
