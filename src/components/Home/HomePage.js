import { useState, useEffect } from "react";
import useMouse from "../helpers/mouseEvent/MouseMove";
import getWindowDimensions from "../helpers/mouseEvent/DocumentSize";
import { home_query as query } from "../helpers/queries";
import fetchData from "../helpers/Fetcher";
import useSWR from "swr";
import LazyLoad from "react-lazy-load";
import "./HomePage.css";

export default function HomePage({ lang = "fr" }) {
    const [page, setPage] = useState(null);
    const { x, y } = useMouse();
    const { width } = getWindowDimensions();
    const { data } = useSWR("homepage", async () => {
        return await fetchData({ query });
    });
    useEffect(() => {
        if (data) {
            setPage(data.heromediaCollection.items);
        }
    }, [data]);

    if (!page) {
        return;
    }

    return (
        <>
            <section className="home">
                <section className="home-module">
                    {y > 90 && (
                        <div
                            className="logo-container"
                            style={{
                                width: `${width - x}px`,
                                height: `${y}px`,
                            }}
                        >
                            <img src="./logo-meta.svg" alt="Meta" />
                        </div>
                    )}
                </section>
                <section>
                    <LazyLoad className="hero-container">
                        <video
                            src={page[0].heromedia.url}
                            playsInline
                            autoPlay
                            loop
                            muted
                        />
                    </LazyLoad>
                </section>
            </section>
        </>
    );
}
