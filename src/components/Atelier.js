import { useState, useEffect } from "react";
import Footer from "./Footer";
import Slideshow from "./helpers/Carousel";
import "./Atelier.css";
import { atelier_engQuery, atelier_freQuery } from "./helpers/queries";
import fetchData from "./helpers/Fetcher";
import useSWR from "swr";

const q = {
    fr: atelier_freQuery,
    "en-US": atelier_engQuery,
};
export default function Atelier({ lang = "fr" }) {
    const [isAtelier, setIsAtelier] = useState([]);
    const [isResidence, setIsResidence] = useState([]);
    const [en, setEn] = useState(false);

    const { data } = useSWR(["atelier", lang], async () => {
        const query = q[lang];
        const isEn = query === q["en-US"];
        const fetchedData = await fetchData({ query });
        const residences = fetchedData.carouselCollection.items.filter(
            (item) => item.validation === "residences"
        );
        const atelier = fetchedData.carouselCollection.items.filter(
            (item) => item.validation === "atelier"
        );
        return { residences, atelier, isEn };
    });

    useEffect(() => {
        if (data) {
            setIsResidence(data.residences);
            setIsAtelier(data.atelier);
            setEn(data.isEn);
        }
    }, [data]);

    if (!isAtelier || !isResidence) {
        return null;
    }
    return (
        <>
            <main className="atelier-section">
                <section className="residences-container">
                    <h1>{en ? "Residences" : "Résidences"}</h1>
                    {isResidence.map(
                        (
                            { carouselImageCollection, description, title },
                            index
                        ) => {
                            return (
                                <div
                                    key={`index-item-${index}`}
                                    className="residences-item"
                                >
                                    <Slideshow
                                        title={title}
                                        images={carouselImageCollection}
                                    />
                                    <h3> {title}</h3>
                                    {description.json.content?.map(
                                        (item, index) => {
                                            return (
                                                <h3 key={`index-item-${index}`}>
                                                    {item.content[0].value}
                                                </h3>
                                            );
                                        }
                                    )}
                                </div>
                            );
                        }
                    )}
                </section>
                <section className="atelier-container">
                    <h1>{en ? "Workshop" : "Atelier"}</h1>
                    {isAtelier.map(
                        (
                            { carouselImageCollection, description, title },
                            index
                        ) => {
                            return (
                                <div
                                    key={`index-item-${index}`}
                                    className="atelier-item"
                                >
                                    <Slideshow
                                        title={title}
                                        images={carouselImageCollection}
                                    />
                                    <h3> {title}</h3>
                                    {description.json.content?.map(
                                        (item, index) => {
                                            return (
                                                <h3 key={`index-item-${index}`}>
                                                    {item.content[0].value}
                                                </h3>
                                            );
                                        }
                                    )}
                                </div>
                            );
                        }
                    )}
                </section>
            </main>
            <footer>
                <Footer lang={lang} />
            </footer>
        </>
    );
}
