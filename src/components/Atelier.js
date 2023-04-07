import { useState, useEffect } from "react";
import GetWindowDimensions from "./mouseEvent/DocumentSize";
import Footer from "./Footer";
import Slideshow from "./helpers/Carousel";
import "./Atelier.css";
import { atelier_engQuery, atelier_freQuery } from "./helpers/queries";

let SPACE_ID, ACCESS_TOKEN;
if (process.env.NODE_ENV === "production") {
    SPACE_ID = process.env.REACT_APP_SPACE_ID;
    ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
} else {
    SPACE_ID = require("../secrets.json").REACT_APP_SPACE_ID;
    ACCESS_TOKEN = require("../secrets.json").REACT_APP_ACCESS_TOKEN;
}

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
        if (query === q["en-US"]) {
            setEn(true);
        } else setEn(false);

        async function fetchData() {
            try {
                const response = await fetch(
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
                }
                const residences = data.carouselCollection.items.filter(
                    (item) => item.validation === "residences"
                );
                setIsResidence(residences);
                const atelier = data.carouselCollection.items.filter(
                    (item) => item.validation === "atelier"
                );
                setIsAtelier(atelier);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
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
