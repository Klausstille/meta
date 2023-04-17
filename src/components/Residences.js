import { useState, useEffect } from "react";
import React from "react";
import "./Residences.css";
import IndexItem from "./helpers/IndexItem";
import { productions_engQuery, productions_freQuery } from "./helpers/queries";
import fetchData from "./helpers/Fetcher";
import useSWR from "swr";
import useSessionStorageState from "use-session-storage-state";

const q = {
    fr: productions_freQuery,
    "en-US": productions_engQuery,
};

export default function Residences({ lang = "fr" }) {
    const [page, setPage] = useState([]);
    const [showAllProjects, setShowAllProjects] = useSessionStorageState(
        "allOpenResidences",
        false
    );
    const [isOpenResidence, setIsOpenResidence] = useSessionStorageState(
        "isOpenResidence",
        []
    );
    const [en, setEn] = useState(null);
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
                    isShown: false,
                };
            }
        );
        const sorted = mapped.sort((a, b) => b.year.localeCompare(a.year));
        return { sorted, isEn };
    });

    useEffect(() => {
        if (data && isOpenResidence) {
            setPage(
                data.sorted.map((item, index) => ({
                    ...item,
                    isShown: isOpenResidence[index],
                }))
            );
            setEn(data.isEn);
        } else if (data) {
            setEn(data.isEn);
            setPage(data.sorted);
        }
    }, [data, setPage, isOpenResidence]);

    const handleShowOne = (id) => {
        const toggleShowOne = page.map((item) =>
            item.id === id ? { ...item, isShown: !item.isShown } : item
        );
        setPage(toggleShowOne);
        setIsOpenResidence(toggleShowOne.map((item) => item.isShown));
    };
    const handleShowAll = () => {
        const toggleShowAll = page.map((item) => ({
            ...item,
            isShown: !showAllProjects,
        }));
        setPage(toggleShowAll);
        setIsOpenResidence(toggleShowAll.map((item) => item.isShown));
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
        </>
    );
}
