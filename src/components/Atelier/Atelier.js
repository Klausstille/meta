import { useState, useEffect } from "react";
import Slideshow from "./Carousel";
import "./Atelier.css";
import { atelier_engQuery, atelier_freQuery } from "../helpers/queries";
import fetchData from "../helpers/Fetcher";
import GetWindowDimensions from "../helpers/mouseEvent/DocumentSize";
import useSWR from "swr";

const q = {
    fr: atelier_freQuery,
    "en-US": atelier_engQuery,
};
export default function Atelier({ lang = "fr" }) {
    const [isAtelier, setIsAtelier] = useState([]);
    const [isResidence, setIsResidence] = useState([]);
    const [showMoreAtelier, setShowMoreAtelier] = useState([]);
    const [showMoreResidences, setShowMoreResidences] = useState([]);
    const [en, setEn] = useState(false);
    const [isPhone, setIsPhone] = useState(false);
    const { width } = GetWindowDimensions();

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

    useEffect(() => {
        width <= 700 ? setIsPhone(true) : setIsPhone(false);
    }, [width, setIsPhone]);

    if (!isAtelier || !isResidence) {
        return null;
    }

    const readMoreResidences = (index) => {
        setShowMoreResidences((prevShowMore) => {
            const newShowMore = [...prevShowMore];
            newShowMore[index] = !newShowMore[index];
            return newShowMore;
        });
    };
    const readMoreAtelier = (index) => {
        setShowMoreAtelier((prevShowMore) => {
            const newShowMore = [...prevShowMore];
            newShowMore[index] = !newShowMore[index];
            return newShowMore;
        });
    };

    return (
        <>
            <main className="atelier-section">
                <section className="residences-container">
                    <section className="atelier-header">
                        <h1>{en ? "Workshop" : "Atelier"}</h1>
                        <h1>↴</h1>
                    </section>
                    {isAtelier.map(
                        (
                            { carouselImageCollection, description, title },
                            index
                        ) => {
                            const content = description.json.content;
                            const showAll = showMoreResidences[index];
                            return (
                                <div
                                    key={`index-item-${index}`}
                                    className="residences-item"
                                >
                                    <Slideshow
                                        title={title}
                                        images={carouselImageCollection}
                                    />
                                    <h3 className="residences-item--title">
                                        {title}
                                    </h3>
                                    {showAll ? (
                                        <div>
                                            {content?.map((item, index) => {
                                                return (
                                                    <h3
                                                        key={`index-item-${index}`}
                                                        className="read-more-text"
                                                    >
                                                        {item.content[0].value}
                                                    </h3>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div>
                                            <h3 className="read-more-text">
                                                {content[0].content[0].value.substring(
                                                    0,
                                                    isPhone ? 200 : 500
                                                )}
                                                <button
                                                    className="read-more-btn"
                                                    onClick={() =>
                                                        readMoreResidences(
                                                            index
                                                        )
                                                    }
                                                >
                                                    {en
                                                        ? "...Read more"
                                                        : "...Lire plus"}
                                                </button>
                                            </h3>
                                        </div>
                                    )}
                                    {showAll && (
                                        <button
                                            className="read-more-btn"
                                            onClick={() =>
                                                readMoreResidences(index)
                                            }
                                        >
                                            {en ? "Show less" : "Réduire"}
                                        </button>
                                    )}
                                </div>
                            );
                        }
                    )}
                </section>
                <section className="atelier-container">
                    <section className="atelier-header">
                        <h1>{en ? "Residences" : "Résidences"}</h1>
                        <h1>↴</h1>
                    </section>
                    {isResidence.map(
                        (
                            { carouselImageCollection, description, title },
                            index
                        ) => {
                            const content = description.json.content;
                            const showAllAtelier = showMoreAtelier[index];

                            return (
                                <div
                                    key={`index-item-${index}`}
                                    className="atelier-item"
                                >
                                    <Slideshow
                                        title={title}
                                        images={carouselImageCollection}
                                    />
                                    <h3 className="atelier-item--title">
                                        {title}
                                    </h3>
                                    {showAllAtelier ? (
                                        <div>
                                            {content?.map((item, index) => {
                                                return (
                                                    <h3
                                                        key={`index-item-${index}`}
                                                        className="read-more-text"
                                                    >
                                                        {item.content[0].value}
                                                    </h3>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div>
                                            <h3 className="read-more-text">
                                                {content[0].content[0].value.substring(
                                                    0,
                                                    isPhone ? 200 : 500
                                                )}
                                                <button
                                                    className="read-more-btn"
                                                    onClick={() =>
                                                        readMoreAtelier(index)
                                                    }
                                                >
                                                    {en
                                                        ? "...Read more"
                                                        : "...Lire plus"}
                                                </button>
                                            </h3>
                                        </div>
                                    )}
                                    {showAllAtelier && (
                                        <button
                                            className="read-more-btn"
                                            onClick={() =>
                                                readMoreAtelier(index)
                                            }
                                        >
                                            {en ? "Show less" : "Réduire"}
                                        </button>
                                    )}
                                </div>
                            );
                        }
                    )}
                </section>
            </main>
        </>
    );
}
