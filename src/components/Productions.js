import { useState, useEffect } from "react";
import IndexItem from "./helpers/IndexItem";
import "./Residences.css";
import Footer from "./Footer";
import { residences_engQuery, residences_freQuery } from "./helpers/queries";

let SPACE_ID, ACCESS_TOKEN;
if (process.env.NODE_ENV === "production") {
    SPACE_ID = process.env.REACT_APP_SPACE_ID;
    ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
} else {
    SPACE_ID = require("../secrets.json").REACT_APP_SPACE_ID;
    ACCESS_TOKEN = require("../secrets.json").REACT_APP_ACCESS_TOKEN;
}

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
        if (query === q["en-US"]) {
            setEn(true);
        } else setEn(false);
        const fetchData = async () => {
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
                    return;
                }

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
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
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
