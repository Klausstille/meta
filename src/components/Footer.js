import React from "react";
import { useState, useEffect } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import MailchimpSubscribe from "react-mailchimp-subscribe";

let SPACE_ID, ACCESS_TOKEN, MAILCHIMP_URL;
if (process.env.NODE_ENV === "production") {
    SPACE_ID = process.env.REACT_APP_SPACE_ID;
    ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
    MAILCHIMP_URL = process.env.REACT_APP_MAILCHIMP_URL;
} else {
    SPACE_ID = require("../secrets.json").REACT_APP_SPACE_ID;
    ACCESS_TOKEN = require("../secrets.json").REACT_APP_ACCESS_TOKEN;
    MAILCHIMP_URL = require("../secrets.json").REACT_APP_MAILCHIMP_URL;
}

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

function Footer({ lang = "fr" }) {
    const [page, setPage] = useState(null);
    const [en, setEn] = useState(false);

    useEffect(() => {
        const query = q[lang];

        if (query === q["en-US"]) {
            setEn(true);
        } else setEn(false);

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
        <div className="footer-container">
            <div className="footer-links">
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <Link to="/atelier">{page[0]}</Link>
                        <Link to="/artistes">{page[1]}</Link>
                        <Link to="/productions">{page[2]}</Link>
                        <Link to="/events">{page[3]}</Link>
                        <Link to="/contact">{page[4]}</Link>
                    </div>

                    <div className="footer-link-items">
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
                <img src="./logo_2.png" alt="" className="logo-2" />
            </div>
        </div>
    );
}

export default Footer;
