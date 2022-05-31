import { useState, useEffect } from "react";
import "./Productions.css";
import ControlledCarousel from "./helpers/Carousel";

const { SPACE_ID, ACCESS_TOKEN } = require("../secrets.json");

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
        </>
    );
}
