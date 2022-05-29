import { useState, useEffect } from "react";
import "./Atelier.css";
import ControlledCarousel from "../Caroussel";

const { SPACE_ID, ACCESS_TOKEN } = require("../secrets.json");

const query = `
{
  homeCollection {
    items {
        textTitle
        homeText{
            json
      }
    }
    
  }
}
`;

export default function Atelier() {
    const [page, setPage] = useState(null);
    const [title, setTitle] = useState("");

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
                // console.log("HALLO");
                console.log(data.homeCollection.items);

                setTitle(data.homeCollection.items);
                setPage(data.homeCollection.items);
            });
    }, []);

    if (!title) {
        return "Loading...";
    }

    // render the fetched Contentful data
    return (
        <div className="atelier">
            {title.map((data) => {
                return (
                    <div key={data.textTitle}>
                        <h1>{data.textTitle}</h1>
                        <h1>
                            {data.homeText.json.content[0].content[0].value}
                        </h1>
                    </div>
                );
            })}
        </div>
    );
}
