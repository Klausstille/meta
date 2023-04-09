import { useState, useEffect } from "react";
import IndexItem from "./helpers/IndexItem";
import "./Residences.css";
import Footer from "./Footer";
import { residences_engQuery, residences_freQuery } from "./helpers/queries";
import fetchData from "./helpers/Fetcher";
import useSWR from "swr";

const q = {
    fr: residences_freQuery,
    "en-US": residences_engQuery,
};

export default function Productions({ lang = "fr" }) {
    const [page, setPage] = useState(null);
    const [en, setEn] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [preview, setPreview] = useState(null);

    const { data } = useSWR(["production", lang], async () => {
        const query = q[lang];
        const isEn = query === q["en-US"];
        const data = await fetchData({ query });
        const mapped = data.productionsCollection.items.map((item) => {
            const year = item.year
                ? item.year.toString().replace("-", "–")
                : "0000–00";
            return {
                artistName: item.artistName,
                projectName: item.projectName,
                description: item.description,
                galleryCollection: item.galleryCollection,
                year,
            };
        });
        const sorted = mapped.sort((a, b) => {
            const [aYearStart, aYearEnd] = a.year.split("–");
            const [bYearStart, bYearEnd] = b.year.split("–");
            return bYearStart - aYearStart + bYearEnd - aYearEnd;
        });
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
            <main className="production-section">
                <section className="index-params">
                    <div
                        className="index-item-info"
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
