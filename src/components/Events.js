import { useState, useEffect } from "react";
import useMouse from "./mouseEvent/MouseMove";
import GetWindowDimensions from "./mouseEvent/DocumentSize";
import Event from "./helpers/Event";
import Footer from "./Footer";
import "./Events.css";
import { events_engQuery, events_freQuery } from "./helpers/queries";

let SPACE_ID, ACCESS_TOKEN;
if (process.env.NODE_ENV === "production") {
    SPACE_ID = process.env.REACT_APP_SPACE_ID;
    ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
} else {
    SPACE_ID = require("../secrets.json").REACT_APP_SPACE_ID;
    ACCESS_TOKEN = require("../secrets.json").REACT_APP_ACCESS_TOKEN;
}

const q = {
    fr: events_freQuery,
    "en-US": events_engQuery,
};

export default function Events({ lang = "fr" }) {
    const [page, setPage] = useState(null);
    const [en, setEn] = useState(false);
    const [isShown, setIsShown] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [preview, setPreview] = useState(false);
    const { x, y } = useMouse();
    const { width } = GetWindowDimensions();

    useEffect(() => {
        const query = q[lang];
        const fetchPageData = async () => {
            try {
                const response = await window.fetch(
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
                } else {
                    setPage(data.residencesCollection.items);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (isShown) {
            const preventDefaultImage = () => {
                if (width <= 1200) {
                    setPreview(false);
                } else {
                    setPreview(true);
                }
            };
            preventDefaultImage();
        }
        fetchPageData();
        const en = query === q["en-US"];
        setEn(en);
    }, [lang, isShown, width]);

    if (!page) {
        return;
    }

    return (
        <>
            <main className="events-container">
                {isShown && (
                    <div
                        className="img-module"
                        onClick={() => {
                            setIsShown(false);
                            setActiveIndex(-1);
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
                                alt={page[activeIndex].residencesPhotos.title}
                                src={page[activeIndex].residencesPhotos.url}
                            />
                            <h6 className="sticky-text">
                                {page[activeIndex].residencesPhotos.title} |{" "}
                                {page[activeIndex].description}
                            </h6>
                        </div>
                    </div>
                )}
                {page.map((data, index) => {
                    return (
                        <Event
                            data={data}
                            setIsShown={setIsShown}
                            setActiveIndex={setActiveIndex}
                            index={index}
                            en={en}
                            key={data.residencesPhotos.title}
                        />
                    );
                })}
            </main>
            <Footer lang={lang} />
        </>
    );
}
