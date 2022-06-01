import { useState, useEffect } from "react";
import React from "react";
import "./Index.css";
import IndexItem from "./IndexItem";

const { SPACE_ID, ACCESS_TOKEN } = require("../../secrets.json");

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
                console.log("HELLO", data.artistesCollection.items);
                setPage(data.artistesCollection.items);
            });
    }, [lang]);

    if (!page) {
        return "Loading...";
    }
    return (
        <>
            <li className="index-params">
                <div className="index-item-info">
                    <p className="index-item-name">Artistes</p>
                </div>
                <div className="index-item-info">
                    <p className="index-item-project">Project</p>
                </div>
                <div className="index-item-info">
                    <p className="index-item-year">Année</p>
                </div>
            </li>
            {page.map((data) => {
                return (
                    <div className="index" key={data.projectName}>
                        <div className="index-container">
                            <div className="index-wrapper">
                                <ul className="index-items">
                                    <IndexItem
                                        name={data.artistName}
                                        project={data.projectName}
                                        year={data.year}
                                        des={
                                            data.description.json.content[0]
                                                .content[0].value
                                        }
                                        src={data.galleryCollection.items}
                                    />
                                </ul>
                            </div>
                        </div>
                        <br />
                    </div>
                );
            })}
            <li className="index-params">
                <div className="index-item-info">
                    <p className="index-item-name">
                        META aujourd'hui c'est deux collaborateurs, artistes,
                        constructeurs et designers, Baptiste et Florent. C'est
                        un espace de travail professionnel performant : atelier
                        équipé, entièrement modulable en fonction des projets de
                        tous volumes et tous matériaux.
                    </p>
                </div>
                <div className="index-item-info">
                    <p className="index-item-project">
                        La volonté de ses membres est de s'inscrire dans une
                        démarche d'économie sociale, solidaire et écologique où
                        la création prime sur la rentabilité.
                    </p>
                </div>
                <div className="index-item-info">
                    <p className="index-item-year">
                        Il s'agit avant tout de faire vivre ce lieu et le faire
                        évoluer au fil des rencontres, au travers de résidences,
                        événements, expos, workshops et autres collaborations
                        artistiques.
                    </p>
                </div>
            </li>
        </>
    );
}

export default Index;
