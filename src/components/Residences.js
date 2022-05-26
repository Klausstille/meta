import { useState, useEffect } from "react";
import useMouse from "../components/mouseEvent/MouseMove";
import getWindowDimensions from "../components/mouseEvent/DocumentSize";

import "./Residences.css";
// import PicDrag from "./components/mouseEvent/PicDrag";

const { SPACE_ID, ACCESS_TOKEN } = require("../secrets.json");

const query = `
{
  residencesCollection {
    items {
      residencesPhotos {
        title
        description
        url
      }
    }
  }
}

`;

function Residences() {
    const [page, setPage] = useState(null);
    const [isShown, setIsShown] = useState(false);
    const [drag, setDrag] = useState(false);
    const { x, y } = useMouse();
    const { width } = getWindowDimensions();

    // console.log(x, y);

    useEffect(() => {
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
    }, []);

    if (!page) {
        return "Loading...";
    }

    // render the fetched Contentful data
    return (
        <div className="home">
            {page.map((data) => {
                return (
                    <div key={data}>
                        <img
                            alt={data}
                            className="residences-pic"
                            src={data.residencesPhotos.url}
                            onClick={() => setIsShown(true)}
                        />
                        {isShown && (
                            <div
                                className="image-container"
                                ref={ref}
                                style={{
                                    width: `${width - x}px`,
                                    height: `${y}px`,
                                }}
                            >
                                <img
                                    alt=""
                                    src={data.residencesPhotos.url}
                                    // onClick={() => setIsShown(false)}
                                />
                            </div>
                        )}
                        <h6>{data.residencesPhotos.title}</h6>
                    </div>
                );
            })}
        </div>
    );
}

export default Residences;
