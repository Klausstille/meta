import { useState, useEffect } from "react";
import IndexItem from "./helpers/IndexItem";
import "./Residences.css";
import Footer from "./Footer";
import { residences_engQuery, residences_freQuery } from "./helpers/queries";
import fetchData from "./helpers/Fetcher";

const q = {
    fr: residences_freQuery,
    "en-US": residences_engQuery,
};

export default function Productions({ lang = "fr" }) {
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
            const mapped = data.productionsCollection.items.map((item) => {
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
    }, [lang]);

    if (!page) {
        return;
    }

    return (
        <>
            <main className="production-section">
                <li className="index-params">
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
                </li>
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
