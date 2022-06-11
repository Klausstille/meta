import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import useMouse from "./components/mouseEvent/MouseMove";
import getWindowDimensions from "./components/mouseEvent/DocumentSize";
import Navbar from "./components/Navbar";
import Atelier from "./components/Atelier";
import HomePage from "./components/HomePage";
import Residences from "./components/Residences";
import Footer from "./components/Footer";
import Artistes from "./components/Artistes";
import Productions from "./components/Productions";
import Contact from "./components/Contact";

import "./App.css";

function App() {
    const { x, y } = useMouse();
    const { width, height } = getWindowDimensions();
    const [lang, setLang] = useState("fr");

    function changeQuery(lang) {
        // console.log("ChangeQuery");
        setLang(lang);
    }

    return (
        <>
            <section>
                <svg id="canvas">
                    <line className="hand" x1={x} y1={y} x2={x} y2="0" />
                    <line className="hand" x1={x} y1={y} x2="0" y2={height} />
                    <line className="hand" x1={x} y1={y} x2={width} y2={y} />
                </svg>
            </section>
            <BrowserRouter>
                <main>
                    <Navbar setLang={changeQuery} lang={lang} />
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={<HomePage lang={lang} />}
                        />
                        <Route
                            path="/atelier"
                            element={<Atelier lang={lang} />}
                        />
                        <Route
                            path="/artistes"
                            element={<Artistes lang={lang} />}
                        />
                        <Route
                            path="/productions"
                            element={<Productions lang={lang} />}
                        />
                        <Route
                            path="/events"
                            element={<Residences lang={lang} />}
                        />
                        <Route
                            path="/contact"
                            element={<Contact lang={lang} />}
                        />
                    </Routes>
                </main>
            </BrowserRouter>
        </>
    );
}

export default App;
