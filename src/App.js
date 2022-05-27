import { BrowserRouter, Route, Routes } from "react-router-dom";
import useMouse from "./components/mouseEvent/MouseMove";
import getWindowDimensions from "./components/mouseEvent/DocumentSize";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Residences from "./components/Residences";
import "./App.css";

function App() {
    const { x, y } = useMouse();
    const { width, height } = getWindowDimensions();

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
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route path="/residences" element={<Residences />} />
                    {/* <Route path="/atelier" element={<Atelier />} />
                    <Route path="/recherche" element={<Recherche />} />
                    <Route path="/contact" element={<Contact />} /> */}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
