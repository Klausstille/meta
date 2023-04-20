import { useState, useEffect } from "react";
import useMouse from "../helpers/mouseEvent/MouseMove";
import GetWindowDimensions from "../helpers/mouseEvent/DocumentSize";
import "./Contact.css";
import { contact_engQuery, contact_freQuery } from "../helpers/queries";
import fetchData from "../helpers/Fetcher";
import useSWR from "swr";

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

    const { data } = useSWR(["contact", lang], async () => {
        const query = q[lang];
        return await fetchData({ query });
    });
    useEffect(() => {
        if (data) {
            setPage(data.bioCollection.items);
        }
        isShown && width <= 1200 ? setPreview(false) : setPreview(true);
    }, [data, isShown, width, setPage, setPreview]);

    if (!page) {
        return;
    }

    return (
        <>
            <section className="contact-section">
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
                                <strong> Klaus Stille</strong>
                            </a>
                        </p>
                    </div>
                    <img
                        alt={page[0].bioTitle}
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
                                {preview ? (
                                    <img
                                        alt={page[0].bioTitle}
                                        src={page[1].bioImage.url}
                                        className="fixed-image"
                                    />
                                ) : (
                                    <>
                                        <img
                                            alt={page[0].bioTitle}
                                            src={page[1].bioImage.url}
                                            className="fixed-image"
                                        />
                                        <img
                                            alt={page[0].bioTitle}
                                            src={page[1].bioImage.url}
                                            className="blurred-image"
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </section>
            </section>
        </>
    );
}

export default Contact;