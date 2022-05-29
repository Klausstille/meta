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
                        <h3>Atelier</h3>
                        <Link to="/sign-up">Workshop</Link>
                        <Link to="/">Artists</Link>
                        <Link to="/">Résidences</Link>
                        <Link to="/">Logement</Link>
                        <Link to="/">Termes de service</Link>
                    </div>
                    <div className="footer-link-items">
                        <h3>Contact</h3>
                        <Link to="/">Contact</Link>
                        <Link to="/">Support</Link>
                        <Link to="/">Collaborations</Link>
                        <Link to="/">Sponsorships</Link>
                    </div>
                </div>
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h3>Social</h3>
                        <Link to="/">Instagram</Link>
                        <Link to="/">Facebook</Link>
                        <Link to="/">Youtube</Link>
                        <Link to="/">Twitter</Link>
                    </div>
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
            <section className="social-media">
                <div className="social-media-wrap">
                    <p className="website-rights">META © 2022</p>
                </div>
            </section>
        </div>
    );
}

export default Footer;
