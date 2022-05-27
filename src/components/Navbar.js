import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./Navbar.css";

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 1400) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    window.addEventListener("resize", showButton);

    useEffect(() => {
        showButton();
    }, []);

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
                                to="/"
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
                                to="/recherche"
                                className="nav-links"
                                onClick={closeMobileMenu}
                            >
                                Recherche
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/portfolio"
                                className="nav-links"
                                onClick={closeMobileMenu}
                            >
                                Portfolio
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
                        <div className="nav-lan">
                            EN <br /> FR
                        </div>
                    </ul>
                    {button && <Button>Sign up</Button>}
                </div>
            </nav>
        </>
    );
}

export default Navbar;
