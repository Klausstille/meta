import { useState, useEffect } from "react";
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
            {/* <section className="carousel-all-cont">
                <CarouselPage />
            </section> */}
            <div className="atelier">
                {page.map((data) => {
                    return (
                        <div key={data.homeText}>
                            <h1>
                                {data.homeText.json.content[0].content[0].value}
                            </h1>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
