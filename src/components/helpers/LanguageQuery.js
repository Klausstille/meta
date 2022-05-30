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

    return (
        <div className="nav-lan">
            <button onClick={handleclick} name="english">
                En
            </button>
            &nbsp;
            <button onClick={handleclick} name="french">
                Fr
            </button>
        </div>
    );
}

export default CheckLanguage;
