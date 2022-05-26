import { useState, useEffect } from "react";
import "./App.css";
const { SPACE_ID, ACCESS_TOKEN } = require("./secrets.json");

const query = `
{
  pageCollection {
    items {
      title
      logo {
        url
      }
    }
  }
}
`;

function App() {
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

export default App;

// import { createClient } from "contentful";
// const { SPACE_ID, ACCESS_TOKEN } = require("./secrets.json");

// const useContenful = () => {
//     const client = createClient({
//         space: SPACE_ID,
//         accessToken: ACCESS_TOKEN,
//     });

//     const getNav = async () => {
//         try {
//             // const entries = await client.getEntries({
//             //     content_type: "page",
//             // });
//             // const filteredEntries = entries.items.map((item) => {
//             //     const logo = item.fields.logo.fields;
//             //     // console.log("entries", entries);
//             //     return {
//             //         ...item.fields,
//             //         logo,
//             //     };
//             // });
//             // return filteredEntries;
//         } catch (error) {
//             console.log("error in useContentful", error);
//         }
//     };

//     return { getNav };
// };

// // export default useContenful;
