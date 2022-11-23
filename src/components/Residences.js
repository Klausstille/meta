import { useState, useEffect } from "react";
import useMouse from "./mouseEvent/MouseMove";
import GetWindowDimensions from "./mouseEvent/DocumentSize";
import Event from "./helpers/Events";
import Footer from "./Footer";
import "./Residences.css";

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
  residencesCollection {
    items {
      description(locale:"en-US")
      residencesPhotos {
        title(locale:"en-US")
        url
      }
      eventText(locale:"en-US") {
        json
      }
    }
  }
}
`;

const freQuery = `
{
  residencesCollection {
    items {
      description(locale:"fr")
      residencesPhotos {
        title(locale:"fr")
        url
      }
      eventText(locale:"fr") {
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

function Residences({ lang = "fr" }) {
    const [page, setPage] = useState(null);
    const [en, setEn] = useState(false);
    const [isShown, setIsShown] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [preview, setPreview] = useState(false);
    const { x, y } = useMouse();
    const { width } = GetWindowDimensions();

    useEffect(() => {
        const query = q[lang];
        // console.log({ lang });
        // console.log(query);
        if (query === q["en-US"]) {
            setEn(true);
        } else setEn(false);
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
                setPage(data.residencesCollection.items);
            });
    }, [lang, isShown, width]);

    if (!page) {
        return;
    }

    return (
        <>
            <div className="events-container">
                {isShown && (
                    <div className="backgrd">
                        <div
                            className="img-module"
                            onClick={() => {
                                setIsShown(false);
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
                                    alt={
                                        page[activeIndex].residencesPhotos.title
                                    }
                                    src={page[activeIndex].residencesPhotos.url}
                                />
                                <h6 className="sticky-text">
                                    {page[activeIndex].residencesPhotos.title} |{" "}
                                    {page[activeIndex].description}
                                </h6>
                            </div>
                        </div>
                    </div>
                )}
                {page.map((data, index) => {
                    return (
                        <Event
                            data={data}
                            setIsShown={setIsShown}
                            setActiveIndex={setActiveIndex}
                            index={index}
                            en={en}
                        />
                    );
                })}
            </div>
            <footer>
                <Footer lang={lang} />
            </footer>
        </>
    );
}

export default Residences;
