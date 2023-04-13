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
    const [showAllProjects, setShowAllProjects] = useState(false);
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
                sys,
            }) => {
                year = year ? year.toString().replace("-", "–") : "0000–00";
                return {
                    artistName,
                    projectName,
                    description,
                    galleryCollection,
                    year,
                    id: sys.id,
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

    const handleShowOne = (id) => {
        setPage(
            page.map((item) =>
                item.id === id ? { ...item, isShown: !item.isShown } : item
            )
        );
    };
    const handleShowAll = () => {
        setPage(
            page.map((item) => {
                return { ...item, isShown: !showAllProjects };
            })
        );
    };

    if (!page) {
        return;
    }
    return (
        <>
            <main className="residences-section">
                <section className="index-params">
                    <div
                        className="index-item-info"
                        onClick={() => {
                            setShowAllProjects((showAll) => !showAll);
                            handleShowAll();
                        }}
                    >
                        <p className="index-item-name">
                            {en
                                ? showAllProjects
                                    ? "↑ Hide all"
                                    : "↓ Show all"
                                : showAllProjects
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
                            name={data.artistName}
                            project={data.projectName}
                            year={data.year}
                            des={
                                data.description.json.content[0].content[0]
                                    .value
                            }
                            src={data.galleryCollection.items}
                            onShow={handleShowOne}
                            showProject={data?.isShown}
                            id={data.id}
                        />
                    );
                })}
            </main>
            <Footer lang={lang} />
        </>
    );
}
