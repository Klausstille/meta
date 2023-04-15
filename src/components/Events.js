import { useState, useEffect } from "react";
import useMouse from "./mouseEvent/MouseMove";
import GetWindowDimensions from "./mouseEvent/DocumentSize";
import Event from "./helpers/Event";

import "./Events.css";
import { events_engQuery, events_freQuery } from "./helpers/queries";
import fetchData from "./helpers/Fetcher";
import useSWR from "swr";

const q = {
    fr: events_freQuery,
    "en-US": events_engQuery,
};

export default function Events({ lang = "fr" }) {
    const [page, setPage] = useState(null);
    const [isShown, setIsShown] = useState(null);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [preview, setPreview] = useState(null);
    const { x, y } = useMouse();
    const { width } = GetWindowDimensions();

    const { data } = useSWR(["events", lang], async () => {
        const query = q[lang];
        return await fetchData({ query });
    });

    useEffect(() => {
        if (data) {
            setPage(data.residencesCollection.items);
        }
    }, [data]);

    useEffect(() => {
        isShown && width <= 1200 ? setPreview(false) : setPreview(true);
    }, [isShown, width, setPreview]);

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
                            {preview ? (
                                <img
                                    alt={
                                        page[activeIndex].residencesPhotos.title
                                    }
                                    src={page[activeIndex].residencesPhotos.url}
                                    className="fixed-image"
                                />
                            ) : (
                                <>
                                    <img
                                        alt={
                                            page[activeIndex].residencesPhotos
                                                .title
                                        }
                                        src={
                                            page[activeIndex].residencesPhotos
                                                .url
                                        }
                                        className="fixed-image"
                                    />
                                    <img
                                        alt={
                                            page[activeIndex].residencesPhotos
                                                .title
                                        }
                                        src={
                                            page[activeIndex].residencesPhotos
                                                .url
                                        }
                                        className="blurred-image"
                                    />
                                </>
                            )}

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
                            key={data.residencesPhotos.title}
                        />
                    );
                })}
            </main>
        </>
    );
}
