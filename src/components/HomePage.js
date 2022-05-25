import { useState, useEffect } from "react";
const { SPACE_ID, ACCESS_TOKEN } = require("../secrets.json");

const query = `
{
  pageCollection {
    items {
      value
    }
  }
}
`;

function HomePage() {
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

                setPage(data.pageCollection.items[0]);
            });
    }, []);

    if (!page) {
        return "Loading...";
    }

    // render the fetched Contentful data
    return (
        <div className="App">
            <header className="App-header">
                <img src={page.logo.url} className="App-logo" alt="logo" />
                <p>{page.title}</p>
            </header>
        </div>
    );
}

export default HomePage;
