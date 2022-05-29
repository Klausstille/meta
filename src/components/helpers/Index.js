import { useState, useEffect } from "react";
import React from "react";
import "./Index.css";
import IndexItem from "./IndexItem";

const { SPACE_ID, ACCESS_TOKEN } = require("../../secrets.json");

const query = `
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

export default function Index() {
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
                console.log("HELLO", data.artistesCollection.items);
                setPage(data.artistesCollection.items);
            });
    }, []);

    if (!page) {
        return "Loading...";
    }
    return (
        <>
            <li className="index-params">
                <div className="index-item-info">
                    <p className="index-item-name">Artiste</p>
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
        </>
    );
}
