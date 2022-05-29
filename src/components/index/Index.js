import React from "react";
import "./Cards.css";
import IndexItem from "./IndexItem";

function Index() {
    return (
        <div className="index">
            <h1>Index</h1>
            <div className="index-container">
                <div className="index-wrapper">
                    <ul className="index-items">
                        <IndexItem
                            src="images/img-9.jpg"
                            text="Explore the hidden waterfall deep inside the Amazon Jungle"
                            label="Adventure"
                            path="/services"
                        />
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Index;
