import React from "react";
import { useState, useEffect } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { footer_engQuery, footer_freQuery } from "./helpers/queries";
import fetchData from "./helpers/Fetcher";

let MAILCHIMP_URL;
process.env.NODE_ENV === "production"
    ? (MAILCHIMP_URL = process.env.REACT_APP_MAILCHIMP_URL)
    : (MAILCHIMP_URL = require("../secrets.json").REACT_APP_MAILCHIMP_URL);

const q = {
    fr: footer_freQuery,
    "en-US": footer_engQuery,
};

function Footer({ lang = "fr" }) {
    const [page, setPage] = useState(null);
    const [en, setEn] = useState(false);

    useEffect(() => {
        const query = q[lang];
        const en = query === q["en-US"];
        setEn(en);
        const fetchDataAsync = async () => {
            const data = await fetchData({ query });
            setPage(data.navbarCollection.items[0].navbar);
        };
        fetchDataAsync();
    }, [lang]);

    if (!page) {
        return;
    }

    return (
        <footer className="footer-container">
            <div className="footer-links">
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <Link to="/atelier">{page[0]}</Link>
                        <Link to="/residences">{page[1]}</Link>
                        <Link to="/productions">{page[2]}</Link>
                        <Link to="/events">{page[3]}</Link>
                        <Link to="/contact">{page[4]}</Link>
                    </div>

                    <div className="footer-link-items">
                        <Link to="/privacy">Privacy</Link>
                        <br></br>
                        <a
                            href="https://www.instagram.com/collectif.meta/"
                            target="blank"
                        >
                            Instagram
                        </a>
                        <a
                            href="https://www.facebook.com/atelier.art.meta"
                            target="blank"
                        >
                            Facebook
                        </a>
                        <a
                            href="https://www.youtube.com/channel/UCHKIHfLxXXAa8LPYHAmzN8Q"
                            target="blank"
                        >
                            Youtube
                        </a>
                        <br />
                    </div>
                </div>
            </div>
            <section className="footer-subscription">
                <div className="footer-subscription-heading">
                    {en ? (
                        <p>Subsribe to our newsletter</p>
                    ) : (
                        <p>Souscrire à notre newsletter</p>
                    )}
                </div>
                <MailchimpSubscribe url={MAILCHIMP_URL} />

                <div className="content__gdprLegal">
                    {en ? (
                        <p style={{ fontSize: "9px", lineHeight: "1.3" }}>
                            You can unsubscribe at any time by clicking on the
                            link in the footer of our emails. We use Mailchimp
                            as our marketing platform. By clicking to subscribe,
                            you acknowledge that your information will be
                            transferred to Mailchimp for processing.{" "}
                            <a
                                rel="noreferrer"
                                href="https://mailchimp.com/legal/terms"
                                target="_blank"
                            >
                                Learn more about Mailchimp's privacy practices
                                here.
                            </a>
                        </p>
                    ) : (
                        <p style={{ fontSize: "9px", lineHeight: "1.3" }}>
                            Vous pouvez vous désabonner à tout moment en
                            cliquant sur le lien dans le bas de page de nos
                            e-mails. Nous utilisons Mailchimp comme plateforme
                            marketing. En cliquant sur souscrire, vous
                            reconnaissez que vos informations seront transférées
                            à Mailchimp.{" "}
                            <a
                                rel="noreferrer"
                                href="https://mailchimp.com/legal/terms"
                                target="_blank"
                            >
                                Learn more about Mailchimp's privacy practices
                                here.
                            </a>
                        </p>
                    )}
                </div>
            </section>
            <section className="contact">
                <div className="contact-wrap">
                    <p className="website-rights">
                        Meta
                        <br />
                        Les Faures
                        <br />
                        24560 Ste Radegonde
                        <br />
                        <a href="mailto:contact@atelier-meta.art">
                            contact(at)atelier-meta.art
                        </a>
                        <br />
                        META © 2022
                    </p>
                </div>
            </section>
            <div>
                <Link to="/">
                    <img src="./logo_2.png" alt="" className="logo-2" />
                </Link>
            </div>
        </footer>
    );
}

export default Footer;
