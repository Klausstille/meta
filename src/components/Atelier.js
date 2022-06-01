import { useState, useEffect } from "react";
import useMouse from "./mouseEvent/MouseMove";
import GetWindowDimensions from "./mouseEvent/DocumentSize";
import "./Atelier.css";

// import CarouselPage from "./helpers/Carousel";

const { SPACE_ID, ACCESS_TOKEN } = require("../secrets.json");

const engQuery = `
{
  homeCollection {
    items {
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
    const { x, y } = useMouse();
    const { width } = GetWindowDimensions();
    // console.log("height, x, y", height, x, y);
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
                console.log(data.homeCollection.items);

                setPage(data.homeCollection.items);
            });
    }, [lang]);

    if (!page) {
        return "Loading...";
    }

    return (
        <>
            <div className="hero-container-atelier">
                <video src="./amalia.mp4" autoPlay loop muted />

                <div className="text-module">
                    {page.map((data) => {
                        return (
                            <div>
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
                                        &nbsp;
                                    </h3>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
