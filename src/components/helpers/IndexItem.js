import React from "react";
import "./Index.css";
// import { Link } from "react-router-dom";

export default function IndexItem(props) {
    return (
        <>
            <li className="index-item">
                <div className="index-item-info">
                    <h2 className="index-item-name">
                        {/* Artiste Nom Prenom */}
                        {props.name}
                    </h2>
                </div>
                <div className="index-item-info">
                    <h2 className="index-item-project">
                        {/* Artiste projects */}
                        {props.project}
                    </h2>
                </div>
                <div className="index-item-info">
                    <h2 className="index-item-year">
                        {/* Anno */}
                        {props.year}
                    </h2>
                </div>
            </li>
            <section className="text-image-grid">
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
        </>
    );
}
