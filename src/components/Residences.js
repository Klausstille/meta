import { useState, useEffect } from "react";
import useMouse from "../components/mouseEvent/MouseMove";
import getWindowDimensions from "../components/mouseEvent/DocumentSize";
import "./Residences.css";

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
                        <h6>{data.residencesPhotos.title}</h6>

                        {isShown && (
                            <div className="img-module">
                                <div
                                    className="image-container"
                                    style={{
                                        width: `${width - x - 1.4}px`,
                                        height: `${y - 1.5}px`,
                                    }}
                                >
                                    <img
                                        alt=""
                                        src={data.residencesPhotos.url}
                                    />

                                    <div
                                        className="close-imgcontainer"
                                        onClick={() => setIsShown(false)}
                                    >
                                        x
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default Residences;
