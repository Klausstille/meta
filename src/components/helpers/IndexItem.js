import React from "react";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import useMouse from "../mouseEvent/MouseMove";
import GetWindowDimensions from "../mouseEvent/DocumentSize";
import "./Index.css";

export default function IndexItem(props) {
    const [isShown, setIsShown] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const { x, y } = useMouse();
    const { width } = GetWindowDimensions();

    return (
        <>
            <li
                className="index-item"
                onClick={() => setIsShown((isShown) => !isShown)}
            >
                <div className="index-item-info">
                    <h3 className="index-item-name">{props.name}</h3>
                </div>
                <div className="index-item-info">
                    <h3 className="index-item-project">{props.project}</h3>
                </div>
                <div className="index-item-info">
                    <h3 className="index-item-year">{props.year}</h3>
                </div>
            </li>

            <section>
                <Transition
                    show={isShown}
                    className="text-image-grid"
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
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
                                        className="index-item-pics"
                                        alt="Pic"
                                        src={data.url}
                                        onClick={() => {
                                            setIsClicked(true);
                                            setActiveIndex(data);
                                        }}
                                    />
                                );
                            })}
                            {isClicked && (
                                <div className="backgrd">
                                    {props.src.map((index) => {
                                        const isActive = index === activeIndex;
                                        return (
                                            <>
                                                <div
                                                    key={index.url}
                                                    className="img-module"
                                                    onClick={() => {
                                                        setIsClicked(false);
                                                        setActiveIndex(-1);
                                                    }}
                                                >
                                                    <div
                                                        className="image-container"
                                                        style={{
                                                            width: `${
                                                                width - x
                                                            }px`,
                                                            height: `${
                                                                y - 1
                                                            }px`,
                                                        }}
                                                    >
                                                        <img
                                                            alt={index}
                                                            active={isActive}
                                                            src={
                                                                activeIndex.url
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </Transition>
            </section>
        </>
    );
}
