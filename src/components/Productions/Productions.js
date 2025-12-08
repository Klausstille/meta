import { useState, useEffect } from "react";
import IndexItem from "../helpers/IndexItem";
import "../Residences/Residences.css";
import { residences_engQuery, residences_freQuery } from "../helpers/queries";
import fetchData from "../helpers/Fetcher";
import useSWR from "swr";
import useSessionStorageState from "use-session-storage-state";

// Preload preview images for all projects
const preloadPreviewImages = (items) => {
    if (!items) return;
    items.forEach((item) => {
        if (item.galleryCollection?.items?.[1]?.url) {
            const previewUrl = item.galleryCollection.items[1].url;
            if (!previewUrl.includes("mp4")) {
                const img = new Image();
                img.src = previewUrl;
            }
        }
    });
};

const q = {
    fr: residences_freQuery,
    "en-US": residences_engQuery,
};

export default function Productions({ lang = "fr" }) {
    const [page, setPage] = useState([]);
    const [showAllProjects, setShowAllProjects] = useSessionStorageState(
        "allOpenProductions",
        false
    );
    const [isOpenProduction, setIsOpenProduction] = useSessionStorageState(
        "isOpenProduction",
        []
    );
    const [en, setEn] = useState(false);
    const { data } = useSWR(["production", lang], async () => {
        const query = q[lang];
        const isEn = query === q["en-US"];
        const data = await fetchData({ query });
        const mapped = data.productionsCollection.items.map(
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
        if (data && isOpenProduction) {
            const mapped = data.sorted.map((item, index) => ({
                ...item,
                isShown: isOpenProduction[index],
            }));
            setPage(mapped);
            setEn(data.isEn);
            // Preload preview images
            preloadPreviewImages(mapped);
        } else if (data) {
            setEn(data.isEn);
            setPage(data.sorted);
            // Preload preview images
            preloadPreviewImages(data.sorted);
        }
    }, [data, setPage, isOpenProduction]);

    const handleShowOne = (id) => {
        const toggleShowOne = page.map((item) =>
            item.id === id ? { ...item, isShown: !item.isShown } : item
        );
        setPage(toggleShowOne);
        setIsOpenProduction(toggleShowOne.map((item) => item.isShown));
    };
    const handleShowAll = () => {
        const toggleShowAll = page.map((item) => ({
            ...item,
            isShown: !showAllProjects,
        }));
        setPage(toggleShowAll);
        setIsOpenProduction(toggleShowAll.map((item) => item.isShown));
    };

    if (!page) {
        return;
    }

    return (
        <>
            <section className="production-section">
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
                            name={data.artistName}
                            project={data.projectName}
                            year={data.year}
                            des={data.description.json.content}
                            src={data.galleryCollection.items}
                            onShow={handleShowOne}
                            showProject={data?.isShown}
                            id={data.id}
                        />
                    );
                })}
            </section>
        </>
    );
}
