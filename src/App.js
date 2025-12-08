import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import useMouse from "./components/helpers/mouseEvent/MouseMove";
import getWindowDimensions from "./components/helpers/mouseEvent/DocumentSize";
import Navbar from "./components/Nav/Navbar";
import Atelier from "./components/Atelier/Atelier";
import HomePage from "./components/Home/HomePage";
import Events from "./components/Events/Events";
import Residences from "./components/Residences/Residences";
import Productions from "./components/Productions/Productions";
import Contact from "./components/Contact/Contact";
import Privacy from "./components/Privacy/Privacy";
import Footer from "./components/Footer/Footer";
import useLocalStorageState from "use-local-storage-state";
import EventItem from "./components/Events/EventItem";
import "./App.css";

function App() {
    const { x, y } = useMouse();
    const { width, height } = getWindowDimensions();
    const [lang, setLang] = useLocalStorageState("lang", "fr");
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(
        "isDarkMode",
        false
    );

    useEffect(() => {
        const themeColorMeta = document.getElementById("theme-color-meta");
        if (themeColorMeta) {
            themeColorMeta.setAttribute(
                "content",
                isDarkMode ? "#141414" : "#ffffff"
            );
        }
    }, [isDarkMode]);

    window.addEventListener("beforeunload", () => {
        sessionStorage.clear();
    });
    const changeQuery = (lang) => {
        setLang(lang);
    };

    return (
        <>
            <svg id="canvas">
                <line className="hand" x1={x} y1={y} x2={x} y2="0" />
                <line className="hand" x1={x} y1={y} x2="0" y2={height} />
                <line className="hand" x1={x} y1={y} x2={width} y2={y} />
            </svg>

            <BrowserRouter>
                <Navbar
                    setLang={changeQuery}
                    lang={lang}
                    setIsDarkMode={setIsDarkMode}
                    isDarkMode={isDarkMode}
                />
                <Routes>
                    <Route exact path="/" element={<HomePage lang={lang} />} />
                    <Route path="/atelier" element={<Atelier lang={lang} />} />
                    <Route
                        path="/residences"
                        element={<Residences lang={lang} />}
                    />
                    <Route
                        path="/productions"
                        element={<Productions lang={lang} />}
                    />
                    <Route path="/events" element={<Events lang={lang} />} />
                    <Route
                        path="/events/:slug"
                        element={<EventItem lang={lang} />}
                    />
                    <Route path="/contact" element={<Contact lang={lang} />} />
                    <Route path="/privacy" element={<Privacy lang={lang} />} />
                </Routes>
                <Footer lang={lang} isDarkMode={isDarkMode} />
            </BrowserRouter>
        </>
    );
}

export default App;
