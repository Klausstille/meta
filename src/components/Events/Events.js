import { useState, useEffect } from "react";
import useMouse from "../helpers/mouseEvent/MouseMove";
import GetWindowDimensions from "../helpers/mouseEvent/DocumentSize";
import EventCard from "./EventCard";
import "./Events.css";
import { events_engQuery, events_freQuery } from "../helpers/queries";
import fetchData from "../helpers/Fetcher";
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
    const [en, setEn] = useState(false);
    const { x, y } = useMouse();
    const { width } = GetWindowDimensions();

    const { data } = useSWR(["events", lang], async () => {
        const query = q[lang];
        const isEn = query === q["en-US"];
        const fetchedData = await fetchData({ query });
        const sorted = fetchedData.residencesCollection.items.sort(
            (a, b) => new Date(b.startDate) - new Date(a.startDate)
        );
        return { sorted, isEn };
    });

    useEffect(() => {
        if (data) {
            setPage(data.sorted);
            setEn(data.isEn);
        }
    }, [data]);

    useEffect(() => {
        isShown && width <= 1200 ? setPreview(false) : setPreview(true);
    }, [isShown, width, setPreview]);

    if (!page) {
        return <h1>LOADING</h1>;
    }
    return (
        <>
            <section className="events-container">
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
                                    alt={page[activeIndex].eventTitle}
                                    src={page[activeIndex].residencesPhotos.url}
                                    className="fixed-image"
                                />
                            ) : (
                                <>
                                    <img
                                        alt={page[activeIndex].eventTitle}
                                        src={
                                            page[activeIndex].residencesPhotos
                                                .url
                                        }
                                        className="fixed-image"
                                    />
                                    <img
                                        alt={page[activeIndex].eventTitle}
                                        src={
                                            page[activeIndex].residencesPhotos
                                                .url
                                        }
                                        className="blurred-image"
                                    />
                                </>
                            )}

                            <h6 className="sticky-text">
                                {page[activeIndex].eventTitle} |{" "}
                                {new Date(
                                    page[activeIndex].startDate
                                ).toLocaleDateString("fr", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })}{" "}
                                -{" "}
                                {new Date(
                                    page[activeIndex].endDate
                                ).toLocaleDateString("fr", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })}
                            </h6>
                        </div>
                    </div>
                )}
                {page.map((data, index) => {
                    return (
                        <EventCard
                            data={data}
                            setIsShown={setIsShown}
                            setActiveIndex={setActiveIndex}
                            index={index}
                            key={data.sys.id}
                            en={en}
                            id={data.sys.id}
                        />
                    );
                })}
            </section>
        </>
    );
}
