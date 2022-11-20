import { useState } from "react";

function CheckLanguage({ setLang }) {
    function handleclick(e) {
        e.preventDefault();
        if (e.target.name === "english") {
            // console.log("EN triggered", { englishQueries });
            setLang("en-US");
        } else if (e.target.name === "french") {
            // console.log("FR triggered", { defaultLangQueries });
            setLang("fr");
        }
    }

    // const [mobileButton, setMobileButton] = useState(true);
    const [click, setClick] = useState(true);
    const switchLang = () => setClick(!click);

    return (
        <>
            <div className="nav-lan" onClick={switchLang}>
                {click ? (
                    <button
                        onClick={handleclick}
                        name="english"
                        className="mobile"
                    >
                        En
                    </button>
                ) : (
                    <button
                        onClick={handleclick}
                        name="french"
                        className="mobile"
                    >
                        Fr
                    </button>
                )}
            </div>
        </>
    );
}

export default CheckLanguage;
