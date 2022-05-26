import { useState, useEffect } from "react";
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
                    <div key={data} className="residences-pic">
                        <img
                            alt={data}
                            src={data.residencesPhotos.url}
                            onClick={() => setIsShown(true)}
                        />
                        {isShown && (
                            <div
                                className="bigPick"
                                // onMouseMove={() => PicDrag()}
                            >
                                {/* <PicDrag imageurl={data.residencesPhotos.url} /> */}
                                <img
                                    alt=""
                                    onClick={() => setIsShown(false)}
                                    src={data.residencesPhotos.url}
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
