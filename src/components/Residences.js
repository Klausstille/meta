import { useState, useEffect } from "react";
import useMouse from "./mouseEvent/MouseMove";
import GetWindowDimensions from "./mouseEvent/DocumentSize";
import "./Residences.css";

const { SPACE_ID, ACCESS_TOKEN } = require("../secrets.json");

const engQuery = `
{
  residencesCollection {
    items {
      residencesPhotos {
        title(locale: "en-US")
        description(locale: "en-US")
        url
      }
    }
  }
}
`;

const freQuery = `
{
  residencesCollection {
    items {
      residencesPhotos {
        title(locale: "fr") 
        description(locale: "fr")
        url
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

    // render the fetched Contentful data
    return (
        <>
            <div className="category-title">
                <h2>What's up</h2>
            </div>
            <div className="projects-grid">
                {page.map((data) => {
                    return (
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
                            <h6>{data.residencesPhotos.title}</h6>
                            <h6>{data.residencesPhotos.description}</h6>
                        </div>
                    );
                })}

                {isShown &&
                    page.map((index) => {
                        const isActive = index === activeIndex;
                        return (
                            <div
                                key={index.residencesPhotos.url}
                                className="img-module-res"
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
                                        src={activeIndex.residencesPhotos.url}
                                    />
                                    <h6 className="sticky-text">
                                        {activeIndex.residencesPhotos.title}
                                    </h6>
                                    {/* <div
                                        className="close-imgcontainer"
                                        onClick={() => setIsShown(false)}
                                    >
                                        x
                                    </div> */}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}

export default Residences;
