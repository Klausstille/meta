import React from "react";
import "./Footer.css";
import { Button } from "./Button";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="footer-container">
            <div className="footer-links">
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <p>Atelier</p>
                        <Link to="/sign-up">Workshop</Link>
                        <Link to="/">Artists</Link>
                        <Link to="/">Résidences</Link>
                        <Link to="/">Logement</Link>
                        <Link to="/">Termes de service</Link>
                    </div>
                    <div className="footer-link-items">
                        <p>Contact</p>
                        <Link to="/">Contact</Link>
                        <Link to="/">Support</Link>
                        <Link to="/">Collaborations</Link>
                        <Link to="/">Sponsorships</Link>
                    </div>
                </div>
                <div className="footer-link-items">
                    <p>Social</p>
                    <Link to="/">Instagram</Link>
                    <Link to="/">Facebook</Link>
                    <Link to="/">Youtube</Link>
                    <Link to="/">Twitter</Link>
                </div>
            </div>
            <section className="footer-subscription">
                <p className="footer-subscription-heading">
                    Faites partie de l'aventure META!
                </p>
                <div className="input-areas">
                    <form>
                        <input
                            className="footer-input"
                            name="email"
                            type="email"
                            placeholder="Your Email"
                        />
                        <Button buttonStyle="btn--outline">Souscrire</Button>
                    </form>
                </div>
            </section>
            <section className="contact">
                <div className="contact-wrap">
                    <p className="website-rights">
                        Atelier Meta
                        <br />
                        Productions Plastiques Les Faures
                        <br />
                        24560 Ste Radegonde
                        <br />
                        inbox.meta(at)gmail.com
                        <br />
                        <br />
                        META © 2022
                    </p>
                </div>
            </section>
        </div>
    );
}

export default Footer;
