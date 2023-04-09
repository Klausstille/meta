import { useState, useEffect } from "react";
import React from "react";
import "./Residences.css";
import IndexItem from "./helpers/IndexItem";
import Footer from "./Footer";
import { productions_engQuery, productions_freQuery } from "./helpers/queries";
import fetchData from "./helpers/Fetcher";

const q = {
    fr: productions_freQuery,
    "en-US": productions_engQuery,
};

export default function Residences({ lang = "fr" }) {
    const [page, setPage] = useState(null);
    const [en, setEn] = useState(null);
    const [showAll, setShowAll] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        const query = q[lang];
        const en = query === q["en-US"];
        setEn(en);
        const fetchDataAsync = async () => {
            const data = await fetchData({ query });
            const mapped = data.artistesCollection.items.map((item) => {
                const year = item.year
                    ? item.year.toString().replace("-", "–")
                    : "0000–00";
                return {
                    artistName: item.artistName,
                    projectName: item.projectName,
                    year,
                    description: item.description,
                    galleryCollection: item.galleryCollection,
                };
            });
            const sorted = mapped.sort((a, b) => {
                const [aYearStart, aYearEnd] = a.year.split("–");
                const [bYearStart, bYearEnd] = b.year.split("–");
                return bYearStart - aYearStart + bYearEnd - aYearEnd;
            });
            setPage(sorted);
        };
        fetchDataAsync();
    }, [lang, showAll]);

    if (!page) {
        return;
    }
    return (
        <>
            <main className="residences-section">
                <section className="index-params">
                    <div
                        className="show-all"
                        onClick={() => setShowAll((showAll) => !showAll)}
                    >
                        {en ? (
                            showAll ? (
                                <p className="index-item-name">↑ Hide all</p>
                            ) : (
                                <p className="index-item-name">↓ Show all</p>
                            )
                        ) : showAll ? (
                            <p className="index-item-name">↑ Voir moins</p>
                        ) : (
                            <p className="index-item-name">↓ Voir tous</p>
                        )}
                    </div>
                    <div className="index-item-info">
                        {en ? (
                            <p className="index-item-name">Artists</p>
                        ) : (
                            <p className="index-item-name">Artistes</p>
                        )}
                    </div>
                    <div className="index-item-info">
                        {en ? (
                            <p className="index-item-project">Project</p>
                        ) : (
                            <p className="index-item-project">Projet</p>
                        )}
                    </div>
                    <div className="index-item-info">
                        {en ? (
                            <p className="index-item-year">Year</p>
                        ) : (
                            <p className="index-item-year">Année</p>
                        )}
                    </div>
                </section>

                {page.map((data, index) => {
                    return (
                        <IndexItem
                            key={`index-item-${index}`}
                            preview={preview}
                            setPreview={setPreview}
                            showAll={showAll}
                            name={data.artistName}
                            project={data.projectName}
                            year={data.year}
                            des={
                                data.description.json.content[0].content[0]
                                    .value
                            }
                            src={data.galleryCollection.items}
                        />
                    );
                })}
            </main>
            <Footer lang={lang} />
        </>
    );
}
