import { useState, useEffect } from "react";
import useMouse from "../components/mouseEvent/MouseMove";
import getWindowDimensions from "../components/mouseEvent/DocumentSize";
import "./HomePage.css";
import Footer from "./Footer";
import { home_query as query } from "./helpers/queries";
import fetchData from "./helpers/Fetcher";

export default function HomePage({ lang = "fr" }) {
    const [page, setPage] = useState(null);
    const { x, y } = useMouse();
    const { width } = getWindowDimensions();

    useEffect(() => {
        const fetchDataAsync = async () => {
            const data = await fetchData({ query });
            setPage(data.heromediaCollection.items);
        };
        fetchDataAsync();
    }, [lang]);

    if (!page) {
        return;
    }

    return (
        <>
            <main className="home">
                <section className="home-module">
                    {y > 90 && (
                        <div
                            className="logo-container"
                            style={{
                                width: `${width - x}px`,
                                height: `${y}px`,
                            }}
                        >
                            <img src="./logo_meta.png" alt="Meta" />
                        </div>
                    )}
                </section>
                <section className="hero-container">
                    <video
                        src={page[0].heromedia.url}
                        playsInline
                        autoPlay
                        loop
                        muted
                    />
                </section>
            </main>
            <Footer lang={lang} />
        </>
    );
}
