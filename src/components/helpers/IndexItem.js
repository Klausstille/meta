import React from "react";
import { useState } from "react";

import "./Index.css";
// import { Link } from "react-router-dom";

export default function IndexItem(props) {
    const [isShown, setIsShown] = useState(false);

    // if (setIsShown(true)) {
    //     setIsShown(false);
    // }

    // onClick() {
    //     this.setState({ showChat: !this.state.showChat });
    // }
    function onIndexClick() {
        console.log("HELLOOOO");
        if (isShown) {
            setIsShown(false);
        } else {
            setIsShown(true);
        }
    }
    return (
        <>
            <li className="index-item" onClick={onIndexClick}>
                <div className="index-item-info">
                    <h2 className="index-item-name">{props.name}</h2>
                </div>
                <div className="index-item-info">
                    <h2 className="index-item-project">{props.project}</h2>
                </div>
                <div className="index-item-info">
                    <h2 className="index-item-year">{props.year}</h2>
                </div>
            </li>

            {isShown && (
                <section className="text-image-grid" onClick={onIndexClick}>
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
                                />
                            );
                        })}
                    </div>
                </section>
            )}
        </>
    );
}
