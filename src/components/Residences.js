import { useState, useEffect } from "react";
import useMouse from "./mouseEvent/MouseMove";
import GetWindowDimensions from "./mouseEvent/DocumentSize";
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
    const [isReadMore, setIsReadMore] = useState(true);

    const { x, y } = useMouse();
    const { width } = GetWindowDimensions();

    const ReadMore = ({ children }) => {
        const text = children;

        return (
            <div className="text">
                {isReadMore ? text[0] : text}
                <div
                    onClick={() => setIsReadMore((isReadMore) => !isReadMore)}
                    className="read-or-hide"
                >
                    {isReadMore ? (
                        <h6 className="readmore">...read more</h6>
                    ) : (
                        <h6 className="readmore">show less</h6>
                    )}
                </div>
            </div>
        );
    };

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

    // render the fetched Contentful data
    return (
        <>
            <div className="events-container">
                {page.map((data) => {
                    return (
                        <>
                            <div className="events-grid">
                                <div key={data.residencesPhotos.url}>
                                    <img
                                        alt={data}
                                        className="residences-pic"
                                        src={data.residencesPhotos.url}
                                        // onClick={() => setIsShown(true)}
                                        onClick={() => {
                                            setIsShown(true);
                                            setActiveIndex(data);
                                        }}
                                    />
                                    <h3 className="title-text">
                                        {data.residencesPhotos.title}
                                    </h3>
                                    <h3 className="description-text">
                                        {data.description}
                                    </h3>
                                </div>
                                <div className="event-text">
                                    <ReadMore>
                                        {data.eventText.json.content.map(
                                            (index) => {
                                                return (
                                                    <h6>
                                                        {index.content[0].value}
                                                    </h6>
                                                );
                                            }
                                        )}
                                    </ReadMore>
                                </div>
                            </div>
                        </>
                    );
                })}

                {isShown && (
                    <div className="backgrd">
                        {page.map((index) => {
                            const isActive = index === activeIndex;
                            return (
                                <div
                                    key={index.residencesPhotos.url}
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
                                            alt={index}
                                            active={isActive}
                                            src={
                                                activeIndex.residencesPhotos.url
                                            }
                                        />
                                        <h6 className="sticky-text">
                                            {activeIndex.residencesPhotos.title}
                                        </h6>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}

export default Residences;
