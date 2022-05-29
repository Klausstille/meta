import { useState, useEffect } from "react";
import useMouse from "../components/mouseEvent/MouseMove";
import getWindowDimensions from "../components/mouseEvent/DocumentSize";
import "./HomePage.css";

const { SPACE_ID, ACCESS_TOKEN } = require("../secrets.json");

const query = `
{
  introCollection {
    items {
        intro{
            json
      }
    }
    
  }
}
`;

export default function HomePage() {
    const { x, y } = useMouse();
    const { width } = getWindowDimensions();
    const [page, setPage] = useState(null);

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
                console.log(data.introCollection.items);
                setPage(data.introCollection.items);
            });
    }, []);

    if (!page) {
        return "Loading...";
    }

    return (
        <div className="home">
            <div className="home-module">
                <div
                    className="logo-container"
                    style={{
                        width: `${width - x}px`,
                        height: `${y + 6}px`,
                    }}
                >
                    <img src="./logo_meta.png" alt="Meta" />
                </div>
            </div>
            {/* {page.map((data) => {
                return (
                    <div key={data.intro}>
                        <h1>{data.intro.json.content[0].content[0].value}</h1>
                    </div>
                );
            })} */}
        </div>
    );
}
