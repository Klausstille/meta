import React from "react";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import LazyLoad from "react-lazy-load";
import { ImageModule } from "./ImageModule";
import "../Residences/Residences.css";

export default function IndexItem({
    name,
    project,
    year,
    des,
    src,
    id,
    showProject = false,
    onShow,
}) {
    const [isShown, setIsShown] = useState(null);
    const [activeIndex, setActiveIndex] = useState(-1);
    const isVideo = src[1]?.url.includes("mp4");
    return (
        <>
            <ImageModule
                data={activeIndex}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                isShown={isShown}
                setIsShown={setIsShown}
                page={"prod"}
            />
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
                                        {isVideo ? (
                                            <video
                                                className="index-preview-pic"
                                                alt={project}
                                                src={src[1]?.url}
                                                playsInline
                                                autoPlay
                                                loop
                                                muted
                                            />
                                        ) : (
                                            <img
                                                className="index-preview-pic"
                                                alt={project}
                                                src={src[1]?.url}
                                            />
                                        )}
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
                                            {des.map((item) => {
                                                return (
                                                    <p
                                                        style={{
                                                            whiteSpace:
                                                                "pre-line",
                                                        }}
                                                    >
                                                        {item.content[0].value}
                                                    </p>
                                                );
                                            })}
                                        </div>
                                        <div className="image-grid">
                                            {src.map((data, index) => {
                                                console.log(
                                                    "data.url",
                                                    data?.url
                                                );
                                                const isVideo =
                                                    data?.url.includes("mp4");
                                                return (
                                                    <LazyLoad
                                                        key={`index-item-${index}`}
                                                    >
                                                        {isVideo ? (
                                                            <video
                                                                className="index-item-pics"
                                                                alt={project}
                                                                src={data?.url}
                                                                playsInline
                                                                autoPlay
                                                                loop
                                                                muted
                                                                onClick={() => {
                                                                    setIsShown(
                                                                        true
                                                                    );
                                                                    setActiveIndex(
                                                                        {
                                                                            url: data.url,
                                                                            name: name,
                                                                            project:
                                                                                project,
                                                                            year: year,
                                                                        }
                                                                    );
                                                                }}
                                                            />
                                                        ) : (
                                                            <img
                                                                className="index-item-pics"
                                                                alt={project}
                                                                src={data?.url}
                                                                onClick={() => {
                                                                    setIsShown(
                                                                        true
                                                                    );
                                                                    setActiveIndex(
                                                                        {
                                                                            url: data.url,
                                                                            name: name,
                                                                            project:
                                                                                project,
                                                                            year: year,
                                                                        }
                                                                    );
                                                                }}
                                                            />
                                                        )}
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
