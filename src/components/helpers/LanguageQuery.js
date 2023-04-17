export default function CheckLanguage({ setLang, lang }) {
    return (
        <div className="nav-lan">
            <button
                onClick={() => setLang(lang === "fr" ? "en-US" : "fr")}
                className="mobile"
                type="button"
            >
                {lang === "fr" ? "En" : "Fr"}
            </button>
        </div>
    );
}
