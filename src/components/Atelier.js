import { useState, useEffect } from "react";
import useMouse from "./mouseEvent/MouseMove";
import GetWindowDimensions from "./mouseEvent/DocumentSize";
import Footer from "./Footer";
import "./Atelier.css";
import { atelier_engQuery, atelier_freQuery } from "./helpers/queries";

let SPACE_ID, ACCESS_TOKEN;
if (process.env.NODE_ENV === "production") {
    SPACE_ID = process.env.REACT_APP_SPACE_ID;
    ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
} else {
    SPACE_ID = require("../secrets.json").REACT_APP_SPACE_ID;
    ACCESS_TOKEN = require("../secrets.json").REACT_APP_ACCESS_TOKEN;
}

const q = {
    fr: atelier_freQuery,
    "en-US": atelier_engQuery,
};

export default function Atelier({ lang = "fr" }) {
    const [page, setPage] = useState(null);
    const { x, y } = useMouse();
    const { width } = GetWindowDimensions();
    const [isShown, setIsShown] = useState(false);
    const [preview, setPreview] = useState(false);

    useEffect(() => {
        const query = q[lang];
        if (isShown) {
            preventDefaultImage();
        }
        function preventDefaultImage() {
            if (width <= 1200) {
                setPreview(false);
            } else if (width > 1200) {
                setPreview(true);
            }
        }
        window
            .fetch(
                `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                    },
                    body: JSON.stringify({ query }),
                }
            )
            .then((response) => response.json())
            .then(({ data, errors }) => {
                if (errors) {
                    console.error(errors);
                }
                setPage(data.homeCollection.items);
            });
    }, [lang, isShown, width]);

    if (!page) {
        return;
    }

    return (
        <>
            <div className="text-module">
                {page.map((data) => {
                    return (
                        <>
                            <div>
                                {data.homeText.json.content.map((content) => {
                                    return content.content.length === 0 ? (
                                        <>{content.content[0].value},</>
                                    ) : (
                                        <h2>
                                            {content.content.map((content) => {
                                                return content.data.uri ? (
                                                    <a
                                                        key={content.data.uri}
                                                        href={content.data.uri}
                                                    >
                                                        {
                                                            content.content[0]
                                                                .value
                                                        }
                                                    </a>
                                                ) : (
                                                    <>{content.value}</>
                                                );
                                            })}
                                        </h2>
                                    );
                                })}
                                <div className="pic-container">
                                    <h6
                                        onClick={() => {
                                            setIsShown(true);
                                        }}
                                    >
                                        ↳ {data.heromedia.title}
                                    </h6>
                                </div>
                            </div>

                            {isShown && (
                                <div
                                    key={data.heromedia.url}
                                    className="img-module-contact"
                                    onClick={() => {
                                        setIsShown(false);
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
                                        <img alt="" src={data.heromedia.url} />
                                        <h6 className="sticky-text">
                                            {data.heromedia.title}
                                        </h6>
                                    </div>
                                </div>
                            )}
                        </>
                    );
                })}
            </div>
            <footer>
                <Footer lang={lang} />
            </footer>
        </>
    );
}
