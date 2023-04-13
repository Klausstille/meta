import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import useMouse from "./components/mouseEvent/MouseMove";
import getWindowDimensions from "./components/mouseEvent/DocumentSize";
import Navbar from "./components/Navbar";
import Atelier from "./components/Atelier";
import HomePage from "./components/HomePage";
import Events from "./components/Events";
import Residences from "./components/Residences";
import Productions from "./components/Productions";
import Contact from "./components/Contact";
import Privacy from "./components/Privacy";
import "./App.css";

function App() {
    const { x, y } = useMouse();
    const { width, height } = getWindowDimensions();
    const [lang, setLang] = useState("fr");
    window.addEventListener("beforeunload", () => {
        sessionStorage.clear();
    });
    function changeQuery(lang) {
        setLang(lang);
        console.log({ lang });
    }

    return (
        <>
            <svg id="canvas">
                <line className="hand" x1={x} y1={y} x2={x} y2="0" />
                <line className="hand" x1={x} y1={y} x2="0" y2={height} />
                <line className="hand" x1={x} y1={y} x2={width} y2={y} />
            </svg>

            <BrowserRouter>
                <Navbar setLang={changeQuery} lang={lang} />
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
                    <Route path="/contact" element={<Contact lang={lang} />} />
                    <Route path="/privacy" element={<Privacy lang={lang} />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
