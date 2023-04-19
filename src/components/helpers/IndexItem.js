import React from "react";
import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import useMouse from "./mouseEvent/MouseMove";
import GetWindowDimensions from "./mouseEvent/DocumentSize";
import LazyLoad from "react-lazy-load";
import "../Residences/Residences.css";

export default function IndexItem({
    preview,
    setPreview,
    name,
    project,
    year,
    des,
    src,
    id,
    showProject = false,
    onShow,
}) {
    const [isClicked, setIsClicked] = useState(null);
    const [activeIndex, setActiveIndex] = useState(-1);
    const { x, y } = useMouse();
    const { width } = GetWindowDimensions();

    const handleEscape = (event) => {
        if (event.keyCode === 27) {
            setIsClicked(false);
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    useEffect(() => {
        isClicked && width <= 1200 ? setPreview(false) : setPreview(true);
    }, [isClicked, setPreview, width]);

    return (
        <>
            {isClicked && (
                <section
                    key={activeIndex.url}
                    className="img-module"
                    onClick={() => {
                        setIsClicked(false);
                        setActiveIndex(-1);
                    }}
                >
                    <div
                        className="image-container"
                        style={
                            preview
                                ? {
                                      width: `${width - x}px`,
                                      height: `${y - 1}px`,
                                  }
                                : {
                                      width: `100%`,
                                      height: `100%`,
                                  }
                        }
                    >
                        {preview ? (
                            <img
                                alt={activeIndex.name}
                                active={activeIndex.isActive}
                                src={activeIndex.url}
                                className="fixed-image"
                            />
                        ) : (
                            <>
                                <img
                                    alt={activeIndex.name}
                                    active={activeIndex.isActive}
                                    src={activeIndex.url}
                                    className="fixed-image"
                                />
                                <img
                                    alt={activeIndex.name}
                                    active={activeIndex.isActive}
                                    src={activeIndex.url}
                                    className="blurred-image"
                                />
                            </>
                        )}

                        <h6 className="sticky-text">
                            {activeIndex.name}
                            {" | "}
                            {activeIndex.project}
                            {" | "}
                            {activeIndex.year}
                        </h6>
                    </div>
                </section>
            )}
            <section className="index" key={project}>
                <div className="index-container">
                    <div className="index-wrapper">
                        <ul className="index-items">
                            <li
                                className="index-item"
                                onClick={() => {
                                    onShow(id);
                                }}
                            >
                                {showProject ? (
                                    <h3 className="index-item-arrow">↳</h3>
                                ) : (
                                    <h3 className="index-item-arrow">→</h3>
                                )}
                                <div className="index-preview-container">
                                    <LazyLoad>
                                        <img
                                            className="index-preview-pic"
                                            alt={project}
                                            src={src[1]?.url}
                                        />
                                    </LazyLoad>
                                </div>
                                <div className="index-item-info">
                                    <h3 className="index-item-name">{name}</h3>
                                </div>
                                <div className="index-item-info">
                                    <h3 className="index-item-project">
                                        {project}
                                    </h3>
                                </div>
                                <div className="index-item-info">
                                    <h3 className="index-item-year">{year}</h3>
                                </div>
                            </li>
                            <section>
                                <Transition
                                    show={showProject}
                                    className="text-image-grid"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="text-image-grid active">
                                        <div className="text-grid">
                                            <p>{des}</p>
                                        </div>
                                        <div className="image-grid">
                                            {src.map((data, index) => {
                                                return (
                                                    <LazyLoad
                                                        key={`index-item-${index}`}
                                                    >
                                                        <img
                                                            className="index-item-pics"
                                                            alt={project}
                                                            src={data.url}
                                                            onClick={() => {
                                                                setIsClicked(
                                                                    true
                                                                );
                                                                setActiveIndex({
                                                                    url: data.url,
                                                                    name: name,
                                                                    project:
                                                                        project,
                                                                    year: year,
                                                                });
                                                            }}
                                                        />
                                                    </LazyLoad>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </Transition>
                            </section>
                        </ul>
                    </div>
                </div>
                <br />
            </section>
        </>
    );
}
