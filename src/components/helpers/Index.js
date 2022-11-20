import { useState, useEffect } from "react";
import React from "react";
import "./Index.css";
import IndexItem from "./IndexItem";
import Footer from "../Footer";

let SPACE_ID, ACCESS_TOKEN;
if (process.env.NODE_ENV === "production") {
    SPACE_ID = process.env.REACT_APP_SPACE_ID;
    ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
} else {
    SPACE_ID = require("../../secrets.json").REACT_APP_SPACE_ID;
    ACCESS_TOKEN = require("../../secrets.json").REACT_APP_ACCESS_TOKEN;
}

const engQuery = `
{
  artistesCollection {
    items {
      artistName
      projectName
      year
      description(locale:"en-US") {
        json
      }
      galleryCollection {
        items {
          url
        }
      }
    }
  }
}
`;

const freQuery = `
{
  artistesCollection {
    items {
      artistName
      projectName
      year
      description(locale:"fr") {
        json
      }
      galleryCollection {
        items {
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

function Index({ lang = "fr" }) {
    const [page, setPage] = useState(null);
    const [en, setEn] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [preview, setPreview] = useState(true);

    useEffect(() => {
        const query = q[lang];
        // console.log({ lang });
        // console.log(query);
        if (query === q["en-US"]) {
            setEn(true);
        } else setEn(false);

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
                setPage(data.artistesCollection.items);
            });
    }, [lang]);

    if (!page) {
        return;
    }
    return (
        <>
            <li className="index-params">
                <div
                    className="index-item-info"
                    onClick={() => setShowAll((showAll) => !showAll)}
                >
                    {en ? (
                        <p className="index-item-name">Show All ⇲</p>
                    ) : (
                        <p className="index-item-name">Voir Tous ⇲</p>
                    )}
                </div>
                <div className="index-item-info">
                    {en ? (
                        <p className="index-item-name">Artists</p>
                    ) : (
                        <p className="index-item-name">Artistes</p>
                    )}
                </div>
                <div className="index-item-info">
                    {en ? (
                        <p className="index-item-project">Project</p>
                    ) : (
                        <p className="index-item-project">Projet</p>
                    )}
                </div>
                <div className="index-item-info">
                    {en ? (
                        <p className="index-item-year">Year</p>
                    ) : (
                        <p className="index-item-year">Année</p>
                    )}
                </div>
            </li>

            {page.map((data) => {
                return (
                    <IndexItem
                        preview={preview}
                        setPreview={setPreview}
                        showAll={showAll}
                        name={data.artistName}
                        project={data.projectName}
                        year={data.year}
                        des={data.description.json.content[0].content[0].value}
                        src={data.galleryCollection.items}
                    />
                );
            })}
            <footer>
                <Footer lang={lang} />
            </footer>
        </>
    );
}

export default Index;
