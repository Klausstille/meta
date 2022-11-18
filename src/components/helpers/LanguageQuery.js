import { useState } from "react";

function CheckLanguage({ setLang }) {
    function handleclick(e) {
        e.preventDefault();
        console.log(e.target.name);

        if (e.target.name === "english") {
            // console.log("EN triggered", { englishQueries });
            setLang("en-US");
        } else if (e.target.name === "french") {
            // console.log("FR triggered", { defaultLangQueries });
            setLang("fr");
        }
    }

    const [mobileButton, setMobileButton] = useState(true);
    const [click, setClick] = useState(true);

    const switchLang = () => setClick(!click);

    const showButton = () => {
        if (window.innerWidth <= 1200) {
            setMobileButton(false);
        } else {
            setMobileButton(true);
        }
    };

    window.addEventListener("resize", showButton);

    return (
        <>
            {mobileButton ? (
                <div className="nav-lan">
                    <button onClick={handleclick} name="english">
                        En
                    </button>
                    <br />
                    <button onClick={handleclick} name="french">
                        Fr
                    </button>
                </div>
            ) : (
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
            )}
        </>
    );
}

export default CheckLanguage;
