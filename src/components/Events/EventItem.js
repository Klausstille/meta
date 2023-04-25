import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./Events.css";
import { events_engQuery, events_freQuery } from "../helpers/queries";
import fetchData from "../helpers/Fetcher";
import { CreateDate } from "../helpers/DateTime";

const q = {
    fr: events_freQuery,
    "en-US": events_engQuery,
};

export default function EventItem({ lang = "fr" }) {
    const { slug } = useParams();
    const [page, setPage] = useState(null);
    const [en, setEn] = useState(false);
    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const query = q[lang];
                const isEn = query === q["en-US"];
                const fetchedData = await fetchData({ query });
                const filtered = fetchedData.residencesCollection.items.filter(
                    (item) => item.slug === slug
                );
                if (!filtered.length) {
                    window.location.href = "/events";
                }
                setPage(filtered);
                setEn(isEn);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEventData();
    }, [slug, lang]);

    useEffect(() => {
        return () => {
            setPage(null);
        };
    }, []);
    return (
        <section className="events-item">
            {page &&
                page?.map((data) => {
                    return (
                        <section
                            key={data.sys.id}
                            className="events-item-section"
                        >
                            <img
                                alt={data.eventTitle}
                                className="events-item__image"
                                src={data.residencesPhotos.url}
                            />
                            <div className="events-item__container">
                                <div className="events-item__info">
                                    <h1>{data.eventTitle}</h1>
                                    <div className="events-item__date">
                                        <CreateDate
                                            start={data.startDate}
                                            end={data.endDate}
                                        />
                                    </div>
                                    <Link
                                        to="/events"
                                        className="events-item__btn"
                                    >
                                        <button className="read-more-btn">
                                            {en ? "← Go back" : "← Retour"}
                                        </button>
                                    </Link>
                                </div>
                                <div className="events-item__text">
                                    {page[0].eventText.json.content?.map(
                                        (item) => (
                                            <p key={item.content[0].value}>
                                                {item.content[0].value}
                                            </p>
                                        )
                                    )}
                                </div>
                            </div>
                        </section>
                    );
                })}
        </section>
    );
}
