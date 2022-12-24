import { useState, useEffect } from "react";
import ProductionItem from "./helpers/IndexItem";
import "./helpers/Index.css";
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

export default function Atelier({ lang = "fr" }) {
    const [page, setPage] = useState(null);
    const [en, setEn] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [preview, setPreview] = useState(false);

    useEffect(() => {
        const query = q[lang];
        if (query === q["en-US"]) {
            setEn(true);
        } else setEn(false);

        window
            .fetch(
                `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                    },
                    body: JSON.stringify({ query }),
                }
            )
            .then((response) => response.json())
            .then(({ data, errors }) => {
                if (errors) {
                    console.error(errors);
                }
                const results = data.productionsCollection.items;
                const mapped = results.map((results) => {
                    let newResults = {};
                    if (!results.year) {
                        var year = "0000–00";
                    } else {
                        year = results.year.toString().replace("-", "–");
                    }
                    newResults = {
                        artistName: results.artistName,
                        projectName: results.projectName,
                        year: year,
                        description: results.description,
                        galleryCollection: results.galleryCollection,
                    };
                    return newResults;
                });
                const sorted = mapped.sort(function (a, b) {
                    let newa = a.year.split("–");
                    let newb = b.year.split("–");
                    return newb[0] - newa[0] + newb[1] - newa[1];
                });
                setPage(sorted);
            });
    }, [lang]);

    if (!page) {
        return;
    }

    return (
        <>
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
            {page.map((data) => {
                return (
                    <ProductionItem
                        preview={preview}
                        setPreview={setPreview}
                        showAll={showAll}
                        name={data.artistName}
                        project={data.projectName}
                        year={data.year}
                        des={data.description.json.content[0].content[0].value}
                        src={data.galleryCollection.items}
                    />
                );
            })}
            <footer>
                <Footer lang={lang} />
            </footer>
        </>
    );
}
