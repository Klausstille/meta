import { useState, useEffect } from "react";
import GetWindowDimensions from "./mouseEvent/DocumentSize";
import Footer from "./Footer";
import Slideshow from "./helpers/Carousel";
import "./Atelier.css";
import { atelier_engQuery, atelier_freQuery } from "./helpers/queries";
import fetchData from "./helpers/Fetcher";

const q = {
    fr: atelier_freQuery,
    "en-US": atelier_engQuery,
};

export default function Atelier({ lang = "fr" }) {
    const [isAtelier, setIsAtelier] = useState([]);
    const [isResidence, setIsResidence] = useState([]);
    const [en, setEn] = useState(false);
    const { width } = GetWindowDimensions();

    useEffect(() => {
        const query = q[lang];
        const en = query === q["en-US"];
        setEn(en);
        const fetchDataAsync = async () => {
            const data = await fetchData({ query });
            const residences = data.carouselCollection.items.filter(
                (item) => item.validation === "residences"
            );
            setIsResidence(residences);
            const atelier = data.carouselCollection.items.filter(
                (item) => item.validation === "atelier"
            );
            setIsAtelier(atelier);
        };
        fetchDataAsync();
    }, [lang, width]);

    if (!isAtelier || !isResidence) {
        return;
    }
    return (
        <>
            <main className="atelier-section">
                <section className="residences-container">
                    {en ? <h1>Residences</h1> : <h1>Résidences</h1>}
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
                    {en ? <h1>Workshop</h1> : <h1>Atelier</h1>}
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
                                        key={`index-item-${index}`}
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
