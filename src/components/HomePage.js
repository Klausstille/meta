import { useState, useEffect } from "react";
import useMouse from "../components/mouseEvent/MouseMove";
import getWindowDimensions from "../components/mouseEvent/DocumentSize";
import "./HomePage.css";
import Footer from "./Footer";
import { home_query as query } from "./helpers/queries";

let SPACE_ID, ACCESS_TOKEN;
if (process.env.NODE_ENV === "production") {
    SPACE_ID = process.env.REACT_APP_SPACE_ID;
    ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
} else {
    SPACE_ID = require("../secrets.json").REACT_APP_SPACE_ID;
    ACCESS_TOKEN = require("../secrets.json").REACT_APP_ACCESS_TOKEN;
}

export default function HomePage({ lang = "fr" }) {
    const [page, setPage] = useState(null);
    const { x, y } = useMouse();
    const { width } = getWindowDimensions();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${ACCESS_TOKEN}`,
                        },
                        body: JSON.stringify({ query }),
                    }
                );
                const { data, errors } = await response.json();
                if (errors) {
                    console.error(errors);
                    return;
                }
                setPage(data.heromediaCollection.items);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [lang]);

    if (!page) {
        return;
    }

    return (
        <>
            <div className="home">
                <div className="home-module">
                    {y > 90 ? (
                        <div
                            className="logo-container"
                            style={{
                                width: `${width - x}px`,
                                height: `${y}px`,
                            }}
                        >
                            <img src="./logo_meta.png" alt="Meta" />
                        </div>
                    ) : (
                        <p></p>
                    )}
                </div>
                <div className="hero-container">
                    <video
                        src={page[0].heromedia.url}
                        playsInline
                        autoPlay
                        loop
                        muted
                    />
                </div>
            </div>
            <Footer lang={lang} />
        </>
    );
}
