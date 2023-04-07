import { useState, useEffect } from "react";
import useMouse from "./mouseEvent/MouseMove";
import GetWindowDimensions from "./mouseEvent/DocumentSize";
import Footer from "./Footer";
import "./Contact.css";
import { contact_engQuery, contact_freQuery } from "./helpers/queries";

let SPACE_ID, ACCESS_TOKEN;
if (process.env.NODE_ENV === "production") {
    SPACE_ID = process.env.REACT_APP_SPACE_ID;
    ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
} else {
    SPACE_ID = require("../secrets.json").REACT_APP_SPACE_ID;
    ACCESS_TOKEN = require("../secrets.json").REACT_APP_ACCESS_TOKEN;
}

const q = {
    fr: contact_freQuery,
    "en-US": contact_engQuery,
};

function Contact({ lang = "fr" }) {
    const [page, setPage] = useState(null);
    const [isShown, setIsShown] = useState(null);
    const { x, y } = useMouse();
    const { width } = GetWindowDimensions();
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        const query = q[lang];
        async function fetchData() {
            try {
                const response = await fetch(
                    `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${ACCESS_TOKEN}`,
                        },
                        body: JSON.stringify({ query }),
                    }
                );
                const { data, errors } = await response.json();
                if (errors) {
                    console.error(errors);
                }
                setPage(data.bioCollection.items);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
        isShown && width <= 1200 ? setPreview(false) : setPreview(true);
    }, [lang, isShown, width, setPage, setPreview]);

    if (!page) {
        return;
    }

    return (
        <>
            <main className="contact-section">
                <section className="contact-grid">
                    <div>
                        <p style={{ textAlign: "left", paddingTop: "0" }}>
                            Les Faures
                            <br />
                            Atelier Residences Recherche
                            <br />
                            24560 Ste Radegonde
                            <br />
                            <a
                                style={{ textDecoration: "none" }}
                                href="mailto:contact@atelier-meta.art"
                            >
                                contact(at)atelier-meta.art
                            </a>
                            <br />
                            <a
                                href="tel:+33(0)783069206"
                                style={{ textDecoration: "none" }}
                            >
                                +33(0)7 8306 9206
                            </a>
                        </p>
                    </div>
                    <div>
                        <p style={{ textAlign: "left", paddingTop: "0" }}>
                            Website concept, design
                            <br />
                            and development: <br />
                            <a
                                href="http://www.stillestudio.com"
                                target="blank"
                                style={{ textDecoration: "none" }}
                            >
                                Klaus Stille
                            </a>
                        </p>
                    </div>
                    <img
                        alt={page}
                        className="contact-pic"
                        src={page[1].bioImage.url}
                        onClick={() => {
                            setIsShown(true);
                        }}
                    />
                </section>
                <section className="contact-grid">
                    {page.map((data) => {
                        return (
                            <div key={data.bioTitle}>
                                <h3>{data.bioTitle}</h3>
                                <p>
                                    {
                                        data.bioText.json.content[0].content[0]
                                            .value
                                    }
                                </p>
                            </div>
                        );
                    })}

                    {isShown && (
                        <div
                            key={page[1].bioImage.url}
                            className="img-module-contact"
                            onClick={() => {
                                setIsShown(false);
                            }}
                        >
                            <div
                                className="image-container"
                                style={
                                    preview
                                        ? {
                                              width: `${width - x}px`,
                                              height: `${y - 1}px`,
                                          }
                                        : {
                                              width: `100%`,
                                              height: `100%`,
                                          }
                                }
                            >
                                <img
                                    alt=""
                                    src={page[1].bioImage.url}
                                    className="fixed-image"
                                />
                                <img
                                    alt=""
                                    src={page[1].bioImage.url}
                                    className="blurred-image"
                                />
                            </div>
                        </div>
                    )}
                </section>
            </main>
            <Footer lang={lang} />
        </>
    );
}

export default Contact;
