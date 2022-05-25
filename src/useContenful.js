import { createClient } from "contentful";
const { SPACE_ID, ACCESS_TOKEN } = require("./secrets.json");

const useContenful = () => {
    const client = createClient({
        space: SPACE_ID,
        accessToken: ACCESS_TOKEN,
    });

    const getNav = async () => {
        try {
            const entries = await client.getEntries({
                content_type: "page",
            });
            const filteredEntries = entries.items.map((item) => {
                const logo = item.fields.logo.fields;
                // console.log("entries", entries);
                return {
                    ...item.fields,
                    logo,
                };
            });

            return filteredEntries;
        } catch (error) {
            console.log("error in useContentful", error);
        }
    };
    return { getNav };
};

export default useContenful;
