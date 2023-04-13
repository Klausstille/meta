import { useState, useEffect } from "react";
import React from "react";
import "./Residences.css";
import IndexItem from "./helpers/IndexItem";
import Footer from "./Footer";
import { productions_engQuery, productions_freQuery } from "./helpers/queries";
import fetchData from "./helpers/Fetcher";
import useSWR from "swr";

const q = {
    fr: productions_freQuery,
    "en-US": productions_engQuery,
};

export default function Residences({ lang = "fr" }) {
    const [page, setPage] = useState(null);
    const [en, setEn] = useState(null);
    const [showAll, setShowAll] = useState(null);
    const [preview, setPreview] = useState(null);

    const { data } = useSWR(["residences", lang], async () => {
        const query = q[lang];
        const isEn = query === q["en-US"];
        const data = await fetchData({ query });
        const mapped = data.artistesCollection.items.map(
            ({
                artistName,
                projectName,
                description,
                galleryCollection,
                year,
            }) => {
                year = year ? year.toString().replace("-", "–") : "0000–00";
                return {
                    artistName,
                    projectName,
                    description,
                    galleryCollection,
                    year,
                };
            }
        );
        const sorted = mapped.sort((a, b) => b.year.localeCompare(a.year));
        return { sorted, isEn };
    });
    useEffect(() => {
        if (data) {
            setEn(data.isEn);
            setPage(data.sorted);
        }
    }, [data]);

    if (!page) {
        return;
    }
    return (
        <>
            <main className="residences-section">
                <section className="index-params">
                    <div
                        className="index-item-info"
                        onClick={() => setShowAll((showAll) => !showAll)}
                    >
                        <p className="index-item-name">
                            {en
                                ? showAll
                                    ? "↑ Hide all"
                                    : "↓ Show all"
                                : showAll
                                ? "↑ Voir moins"
                                : "↓ Voir tous"}
                        </p>
                    </div>
                    <div className="index-item-info">
                        <p className="index-item-name">
                            {en ? "Artists" : "Artistes"}
                        </p>
                    </div>
                    <div className="index-item-info">
                        <p className="index-item-project">
                            {en ? "Project" : "Projet"}
                        </p>
                    </div>
                    <div className="index-item-info">
                        <p className="index-item-year">
                            {en ? "Year" : "Année"}
                        </p>
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
