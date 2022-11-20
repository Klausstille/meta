import React from "react";
import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import useMouse from "../mouseEvent/MouseMove";
import GetWindowDimensions from "../mouseEvent/DocumentSize";
import "./Index.css";

export default function IndexItem(props) {
    const [oneIsShown, setOneIsShown] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isSwitch, setSwitch] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const { x, y } = useMouse();
    const { width } = GetWindowDimensions();

    const escape = (e) => {
        if (e.keyCode === 27) {
            setIsClicked(false);
        }
        return document.removeEventListener("keydown", escape);
    };
    document.addEventListener("keydown", escape);

    function handleClick(e) {
        if (e.currentTarget.innerText.indexOf("→") === 0) {
            setSwitch(true);
        } else if (e.currentTarget.innerText.indexOf("→") === -1) {
            setSwitch(false);
        }
    }

    useEffect(() => {
        if (props.showAll) {
            isSwitch ? setSwitch(false) : setSwitch(true);
        } else if (!props.showAll) {
            !isSwitch ? setSwitch(true) : setSwitch(false);
        }
        const preventDefaultImage = () => {
            console.log("RESIZSINGGG");
            if (width <= 1200) {
                props.setPreview(false);
            } else if (width > 1200) {
                console.log("BIG ENOUGN");
                props.setPreview(true);
            }
        };
        if (isClicked) {
            preventDefaultImage();
        }
    }, [props.showAll, width, isClicked]);

    return (
        <>
            {isClicked && (
                <div className="backgrd">
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
                                props.preview
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
                </div>
            )}
            <div
                className="index"
                key={props.projectName}
                onClick={handleClick}
            >
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
                                    <h3 className="index-item-name">
                                        {props.name}
                                    </h3>
                                </div>
                                <div className="index-item-info">
                                    <h3 className="index-item-project">
                                        {props.project}
                                    </h3>
                                </div>
                                <div className="index-item-info">
                                    <h3 className="index-item-year">
                                        {props.year}
                                    </h3>
                                </div>
                            </li>

                            <section>
                                <Transition
                                    // show={isShown}
                                    show={
                                        (oneIsShown
                                            ? oneIsShown
                                            : props.showAll) ||
                                        (props.showAll
                                            ? props.showAll
                                            : oneIsShown)
                                    }
                                    hidden={
                                        (oneIsShown
                                            ? props.showAll
                                            : oneIsShown) ||
                                        (props.showAll
                                            ? oneIsShown
                                            : props.showAll)
                                    }
                                    className="text-image-grid"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="text-image-grid active">
                                        <div className="text-grid">
                                            <p>{props.des}</p>
                                        </div>
                                        <div className="image-grid">
                                            {props.src.map((data) => {
                                                return (
                                                    <img
                                                        key={data.url}
                                                        className="index-item-pics"
                                                        alt="Pic"
                                                        src={data.url}
                                                        onClick={() => {
                                                            setIsClicked(true);
                                                            setActiveIndex({
                                                                url: data.url,
                                                                name: props.name,
                                                                project:
                                                                    props.project,
                                                                year: props.year,
                                                            });
                                                        }}
                                                    />
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
