import { useState, useEffect } from "react";
import "./Productions.css";
import ControlledCarousel from "./helpers/Carousel";
import Footer from "./Footer";

let SPACE_ID, ACCESS_TOKEN;
if (process.env.NODE_ENV === "production") {
    SPACE_ID = process.env.REACT_APP_SPACE_ID;
    ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
} else {
    SPACE_ID = require("../secrets.json").REACT_APP_SPACE_ID;
    ACCESS_TOKEN = require("../secrets.json").REACT_APP_ACCESS_TOKEN;
}

// const { SPACE_ID, ACCESS_TOKEN } = require("../secrets.json");

const engQuery = `
{
  carouselCollection {
    items {
      carouselImageCollection {
        items {
          title(locale: "en-US")
          description(locale: "en-US")
          url
        }
      }
    }
  }
}
`;

const freQuery = `
{
  carouselCollection {
    items {
      carouselImageCollection {
        items {
          title(locale: "fr")
          description(locale: "fr")
          url
        }
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
                console.log(data.carouselCollection.items);
                setPage(data.carouselCollection.items);
            });
    }, [lang]);

    if (!page) {
        return "Loading...";
    }

    return (
        <>
            {page.map((data) => {
                return (
                    <section className="carousel-all-cont">
                        <ControlledCarousel
                            props={data.carouselImageCollection.items}
                        />
                    </section>
                );
            })}
            <footer>
                <Footer lang={lang} />
            </footer>
        </>
    );
}
