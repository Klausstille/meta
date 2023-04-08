let SPACE_ID, ACCESS_TOKEN;
if (process.env.NODE_ENV === "production") {
    SPACE_ID = process.env.REACT_APP_SPACE_ID;
    ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
} else {
    SPACE_ID = require("../../secrets.json").REACT_APP_SPACE_ID;
    ACCESS_TOKEN = require("../../secrets.json").REACT_APP_ACCESS_TOKEN;
}

async function fetchData({ query }) {
    try {
        const response = await fetch(
            `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
                body: JSON.stringify({ query }),
            }
        );
        const { data, errors } = await response.json();
        if (errors) {
            console.error(errors);
        }
        return data;
    } catch (error) {
        console.error(error);
    }
}

export default fetchData;
