import { useState, useEffect } from "react";
import useMouse from "./mouseEvent/MouseMove";
import GetWindowDimensions from "./mouseEvent/DocumentSize";
import Event from "./helpers/Events";
import "./Residences.css";

const { SPACE_ID, ACCESS_TOKEN } = require("../secrets.json");

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
    const [isShown, setIsShown] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const { x, y } = useMouse();
    const { width } = GetWindowDimensions();

    useEffect(() => {
        const query = q[lang];

        console.log({ lang });
        console.log(query);

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
                console.log(data.residencesCollection.items);
                setPage(data.residencesCollection.items);
            });
    }, [lang]);

    if (!page) {
        return "Loading...";
    }

    return (
        <>
            <div className="events-container">
                {page.map((data, index) => {
                    return (
                        <Event
                            data={data}
                            setIsShown={setIsShown}
                            setActiveIndex={setActiveIndex}
                            index={index}
                        />
                    );
                })}

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
                                style={{
                                    width: `${width - x}px`,
                                    height: `${y - 1}px`,
                                }}
                            >
                                <img
                                    alt={
                                        page[activeIndex].residencesPhotos.title
                                    }
                                    src={page[activeIndex].residencesPhotos.url}
                                />
                                <h6 className="sticky-text">
                                    {page[activeIndex].residencesPhotos.title}
                                </h6>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Residences;
