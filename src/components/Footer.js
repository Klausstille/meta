import React from "react";
import { useState, useEffect } from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { footer_engQuery, footer_freQuery } from "./helpers/queries";
import fetchData from "./helpers/Fetcher";
import useSWR from "swr";

let MAILCHIMP_URL;
process.env.NODE_ENV === "production"
    ? (MAILCHIMP_URL = process.env.REACT_APP_MAILCHIMP_URL)
    : (MAILCHIMP_URL = require("../secrets.json").REACT_APP_MAILCHIMP_URL);

const q = {
    fr: footer_freQuery,
    "en-US": footer_engQuery,
};

function Footer({ lang = "fr", isDarkMode }) {
    const [page, setPage] = useState(null);
    const [en, setEn] = useState(false);

    const { data } = useSWR(["footer", lang], async () => {
        const query = q[lang];
        const isEn = query === q["en-US"];
        const data = await fetchData({ query });
        return { data, isEn };
    });

    useEffect(() => {
        if (data) {
            setEn(data.isEn);
            setPage(data.data.navbarCollection.items[0].navbar);
        }
    }, [data]);

    if (!page) {
        return;
    }

    return (
        <footer className="footer-container">
            <div className="footer-links">
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <NavLink to="/atelier" className="footer-link-item">
                            {page[0]}
                        </NavLink>
                        <NavLink to="/residences" className="footer-link-item">
                            {page[1]}
                        </NavLink>
                        <NavLink to="/productions" className="footer-link-item">
                            {page[2]}
                        </NavLink>
                        <NavLink to="/events" className="footer-link-item">
                            {page[3]}
                        </NavLink>
                        <NavLink to="/contact" className="footer-link-item">
                            {page[4]}
                        </NavLink>
                    </div>

                    <div className="footer-link-items">
                        <NavLink to="/privacy">Privacy</NavLink>
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
                    <p>
                        {en
                            ? "Subsribe to our newsletter"
                            : "Souscrire à notre newsletter"}
                    </p>
                </div>
                <MailchimpSubscribe url={MAILCHIMP_URL} />

                <div className="content__gdprLegal">
                    <p style={{ fontSize: "9px", lineHeight: "1.3" }}>
                        {en
                            ? "You can unsubscribe at any time by clicking on the link in the footer of our emails. We use Mailchimp as our marketing platform. By clicking to subscribe, you acknowledge that your information will be transferred to Mailchimp for processing."
                            : "Vous pouvez vous désabonner à tout moment en cliquant sur le lien dans le bas de page de nos e-mails. Nous utilisons Mailchimp comme plateforme marketing. En cliquant sur souscrire, vous reconnaissez que vos informations seront transférées à Mailchimp."}
                        <a
                            rel="noreferrer"
                            href="https://mailchimp.com/legal/terms"
                            target="_blank"
                        >
                            {en
                                ? "Learn more about Mailchimp's privacy practices here."
                                : "En savoir plus sur les pratiques de confidentialité de Mailchimp ici."}
                        </a>
                    </p>
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
                <NavLink to="/">
                    <img
                        src={isDarkMode ? "./logo-dark.svg" : "./logo.svg"}
                        alt="meta-logo"
                        className="logo-2"
                    />
                </NavLink>
            </div>
        </footer>
    );
}

export default Footer;
