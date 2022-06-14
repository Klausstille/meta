import React from "react";
import { useState, useEffect } from "react";
import "./Footer.css";
import { Button } from "./Button";
import { Link } from "react-router-dom";

let SPACE_ID, ACCESS_TOKEN;
if (process.env.NODE_ENV === "production") {
    SPACE_ID = process.env.REACT_APP_SPACE_ID;
    ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
} else {
    SPACE_ID = require("../secrets.json").REACT_APP_SPACE_ID;
    ACCESS_TOKEN = require("../secrets.json").REACT_APP_ACCESS_TOKEN;
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
                            href="https://www.instagram.com/collectif.meta/"
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
                    </div>
                </div>
            </div>
            <section className="footer-subscription">
                <div className="footer-subscription-heading">
                    {en ? (
                        <p>Be part of our METAdventure!</p>
                    ) : (
                        <p>Faites partie de la METAventure!</p>
                    )}
                </div>
                <div className="input-areas">
                    <form>
                        <input
                            className="footer-input"
                            name="email"
                            type="email"
                            placeholder="Email"
                        />
                        <Button>
                            {en ? <p>Subscribe</p> : <p>Souscrire</p>}
                        </Button>
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
                        <a href="mailto:inbox.meta@gmail.com">
                            inbox.meta(at)gmail.com
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
