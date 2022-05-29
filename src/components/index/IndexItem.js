import React from "react";
import { Link } from "react-router-dom";

function IndexItem(props) {
    return (
        <>
            <li className="index-item">
                <Link className="index-item-link" to={props.path}>
                    <figure
                        className="index-item-text-wrap"
                        data-category={props.label}
                    ></figure>
                    <div className="index-item-info">
                        <h5 className="index-item-text">{props.text}</h5>
                    </div>
                </Link>
            </li>
        </>
    );
}

export default IndexItem;
