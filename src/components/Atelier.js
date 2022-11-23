import { useState, useEffect } from "react";
import useMouse from "./mouseEvent/MouseMove";
import GetWindowDimensions from "./mouseEvent/DocumentSize";
import Footer from "./Footer";
import "./Atelier.css";

let SPACE_ID, ACCESS_TOKEN;
if (process.env.NODE_ENV === "production") {
    SPACE_ID = process.env.REACT_APP_SPACE_ID;
    ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
} else {
    SPACE_ID = require("../secrets.json").REACT_APP_SPACE_ID;
    ACCESS_TOKEN = require("../secrets.json").REACT_APP_ACCESS_TOKEN;
}

// const { SPACE_ID, ACCESS_TOKEN } = require("../secrets.json");

const engQuery = `
{
  homeCollection {
    items {
      heromedia {
        url
        title(locale:"en-US")
      }
      homeText(locale: "en-US") {
        json
      }
    }
  }
}

`;

const freQuery = `
{
  homeCollection {
    items {
      heromedia {
        url
        title(locale:"fr")

      }
      homeText(locale: "fr") {
        json
      }
    }
  }
}

`;

const q = {
    fr: freQuery,
    "en-US": engQuery,
};

export default function Atelier({ lang = "fr" }) {
    const [page, setPage] = useState(null);
    // const [en, setEn] = useState(false);
    const { x, y } = useMouse();
    const { width } = GetWindowDimensions();
    // console.log("height, x, y", height, x, y);
    useEffect(() => {
        const query = q[lang];
        // console.log({ lang });
        // console.log(query);

        // if (query === q["en-US"]) {
        //     setEn(true);
        // } else setEn(false);

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
    }, [lang]);

    if (!page) {
        return;
    }

    return (
        <>
            <div>
                {/* <video src="./amalia.mp4" autoPlay loop muted /> */}
                <div className="text-module">
                    {page.map((data) => {
                        return (
                            <>
                                {/* <div>
                                    {y > 64 ? (
                                        <h1
                                            key={data.homeText}
                                            className="text-container"
                                            style={{
                                                width: `${width - x}px`,
                                                height: `${y - 63}px`,
                                            }}
                                        >
                                            {
                                                data.homeText.json.content[0]
                                                    .content[0].value
                                            }
                                        </h1>
                                    ) : (
                                        <h3
                                            key={data.homeText}
                                            className="text-container"
                                            style={{
                                                width: `0px`,
                                                height: `0px`,
                                            }}
                                        >

                                        </h3>
                                    )}
                                </div> */}
                                <div>
                                    {data.homeText.json.content.map(
                                        (content) => {
                                            return content.content.length ===
                                                0 ? (
                                                <>{content.content[0].value},</>
                                            ) : (
                                                <h2>
                                                    {content.content.map(
                                                        (content) => {
                                                            return content.data
                                                                .uri ? (
                                                                <a
                                                                    href={
                                                                        content
                                                                            .data
                                                                            .uri
                                                                    }
                                                                >
                                                                    {
                                                                        content
                                                                            .content[0]
                                                                            .value
                                                                    }
                                                                </a>
                                                            ) : (
                                                                <>
                                                                    {
                                                                        content.value
                                                                    }
                                                                </>
                                                            );
                                                        }
                                                    )}
                                                </h2>
                                            );
                                        }
                                    )}
                                </div>
                                {/* <div className="back">
                                    {en ? (
                                        <h3>
                                            ↑<br />
                                            Move mouse here and scroll!
                                            <br />↓
                                        </h3>
                                    ) : (
                                        <h3>
                                            ↑<br />
                                            Déplacez la souris ici et faites
                                            défiler!
                                            <br />↓
                                        </h3>
                                    )}
                                </div> */}
                                {y > 90 ? (
                                    <div
                                        className="atelier-img"
                                        style={{
                                            width: `${width - x}px`,
                                            height: `${y}px`,
                                        }}
                                    >
                                        <img src={data.heromedia.url} alt="" />
                                        <h6 className="sticky-text">
                                            {data.heromedia.title}
                                        </h6>
                                    </div>
                                ) : (
                                    <p></p>
                                )}
                            </>
                        );
                    })}
                </div>
            </div>
            <footer>
                <Footer lang={lang} />
            </footer>
        </>
    );
}
