import { useState } from "react";

const CheckLanguage = () => {
    const [queries, setQueries] = useState("");
    const defaultLangQueries = `
{
  residencesCollection {
    items {
      residencesPhotos {
        title(locale: "fr") 
        description(locale: "fr")
        url
      }
    }
  }
}
`;
    const englishQueries = `
{
  residencesCollection {
    items {
      residencesPhotos {
        title(locale: "en-US")
        description(locale: "en-US")
        url
      }
    }
  }
}
`;

    function handleclick(e) {
        // e.preventDefault();
        // console.log(e.target.name);
        if (e.target.name === "english") {
            console.log("EN triggered", { englishQueries });
            setQueries({ englishQueries });
        } else if (e.target.name === "french") {
            console.log("FR triggered", { defaultLangQueries });
            setQueries({ defaultLangQueries });
        }
    }

    return (
        <div className="nav-lan">
            <button onClick={handleclick} name="english">
                EN
            </button>
            <button onClick={handleclick} name="french">
                FR
            </button>
        </div>
    );
};

export default CheckLanguage;
