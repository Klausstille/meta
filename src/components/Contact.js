import { useState, useEffect } from "react";
import useMouse from "./mouseEvent/MouseMove";
import GetWindowDimensions from "./mouseEvent/DocumentSize";
import "./Contact.css";

const { SPACE_ID, ACCESS_TOKEN } = require("../secrets.json");

const engQuery = `
{
  bioCollection {
    items {
      bioText (locale: "en-US") {
        json
      }
      bioTitle
      bioImage {
        url
      }
    }
  }
}
`;

const freQuery = `
{
  bioCollection {
    items {
      bioText (locale: "fr") {
        json
      }
      bioTitle
      bioImage {
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

function Contact({ lang = "fr" }) {
    const [page, setPage] = useState(null);
    const [isShown, setIsShown] = useState(false);
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
                console.log(data.bioCollection.items);
                setPage(data.bioCollection.items);
            });
    }, [lang]);

    if (!page) {
        return "Loading...";
    }

    return (
        <>
            <div className="contact-grid">
                {page.map((data) => {
                    return (
                        <div key={data.bioTitle}>
                            <h2>{data.bioTitle}</h2>
                            <h6>
                                {data.bioText.json.content[0].content[0].value}
                            </h6>
                        </div>
                    );
                })}
                <img
                    alt={page}
                    className="contact-pic"
                    src={page[1].bioImage.url}
                    onClick={() => {
                        setIsShown(true);
                    }}
                />
                {isShown && (
                    <div
                        key={page[1].bioImage.url}
                        className="img-module-contact"
                        onClick={() => {
                            setIsShown(false);
                        }}
                    >
                        <div
                            className="image-container"
                            style={{
                                width: `${width - x}px`,
                                height: `${y - 1}px`,
                            }}
                        >
                            <img alt="" src={page[1].bioImage.url} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Contact;