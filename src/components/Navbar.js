import React, { useState } from "react";
import { Link } from "react-router-dom";
import CheckLanguage from "./helpers/LanguageQuery";
import "./Navbar.css";

function Navbar() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

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
                                Atelier
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/residences"
                                className="nav-links"
                                onClick={closeMobileMenu}
                            >
                                Résidences
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/artistes"
                                className="nav-links"
                                onClick={closeMobileMenu}
                            >
                                Artistes
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/productions"
                                className="nav-links"
                                onClick={closeMobileMenu}
                            >
                                Productions
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/contact"
                                className="nav-links"
                                onClick={closeMobileMenu}
                            >
                                Contact
                            </Link>
                        </li>
                        <CheckLanguage />
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
