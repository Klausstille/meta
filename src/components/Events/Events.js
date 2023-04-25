import { useState, useEffect } from "react";
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
    const [en, setEn] = useState(false);
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

    if (!page) {
        return <h1>LOADING</h1>;
    }
    return (
        <>
            <section className="events-container">
                {page.map((data, index) => {
                    return (
                        <EventCard
                            data={data}
                            index={index}
                            key={data.sys.id}
                            en={en}
                            slug={data.slug}
                        />
                    );
                })}
            </section>
        </>
    );
}
