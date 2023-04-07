import React from "react";
import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import useMouse from "../mouseEvent/MouseMove";
import GetWindowDimensions from "../mouseEvent/DocumentSize";
import LazyLoad from "react-lazy-load";

import "../Residences.css";

export default function IndexItem({
    preview,
    setPreview,
    showAll,
    name,
    project,
    year,
    des,
    src,
}) {
    const [oneIsShown, setOneIsShown] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isSwitch, setSwitch] = useState(null);
    const [activeIndex, setActiveIndex] = useState(-1);
    const { x, y } = useMouse();
    const { width } = GetWindowDimensions();

    const handleEscape = (event) => {
        if (event.keyCode === 27) {
            setIsClicked(false);
        }
    };

    const handleClick = (event) => {
        const { innerText } = event.currentTarget;
        const { className } = event.target.parentElement;

        if (
            innerText.indexOf("→") === 0 &&
            className.indexOf("index-item") === 0
        ) {
            setSwitch(true);
        } else if (
            innerText.indexOf("→") === -1 &&
            className.indexOf("index-item") === 0
        ) {
            setSwitch(false);
        }
    };

    const handleShowAll = () => {
        setSwitch((isSwitch) => !isSwitch);
    };

    useEffect(() => {
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    useEffect(() => {
        if (showAll) {
            handleShowAll();
        }
    }, [showAll]);

    useEffect(() => {
        const preventDefaultImage = () => {
            setPreview(width > 1200);
        };
        if (isClicked) {
            preventDefaultImage();
        }
    }, [isClicked, setPreview, width]);

    return (
        <>
            {isClicked && (
                <div
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
                        <img
                            alt={activeIndex.name}
                            active={activeIndex.isActive}
                            src={activeIndex.url}
                        />
                        <h6 className="sticky-text">
                            {activeIndex.name}
                            {" | "}
                            {activeIndex.project}
                            {" | "}
                            {activeIndex.year}
                        </h6>
                    </div>
                </div>
            )}
            <div className="index" key={project} onClick={handleClick}>
                <div className="index-container">
                    <div className="index-wrapper">
                        <ul className="index-items">
                            <li
                                className="index-item"
                                onClick={() => {
                                    setOneIsShown((oneIsShown) => !oneIsShown);
                                }}
                            >
                                {isSwitch ? (
                                    <h3 className="index-item-arrow">↳</h3>
                                ) : (
                                    <h3 className="index-item-arrow">→</h3>
                                )}
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
                                    show={
                                        (oneIsShown ? oneIsShown : showAll) ||
                                        (showAll ? showAll : oneIsShown)
                                    }
                                    hidden={
                                        (oneIsShown ? showAll : oneIsShown) ||
                                        (showAll ? oneIsShown : showAll)
                                    }
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
                                                            key={`index-item-${index}`}
                                                            className="index-item-pics"
                                                            alt="Pic"
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
            </div>
        </>
    );
}
