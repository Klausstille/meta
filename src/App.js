// import { useState, useEffect } from "react";
// import useContenful from "./useContenful";
// import Eventpage from "./components/Eventpage";
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
            <BrowserRouter>
                <svg className="canvas">
                    <line class="hand" x1={x} y1={y} x2={x} y2="0" />
                    <line class="hand" x1={x} y1={y} x2="0" y2={height} />
                    <line class="hand" x1={x} y1={y} x2={width} y2={y} />
                </svg>
                <Navbar />

                <Residences />
                <HomePage />
            </BrowserRouter>

            {/* <BrowserRouter>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route path="/residences">
                    <Residences />
                </Route>
                { <Route path="/products" />
                    <Route path="/sign-up" /> }
            </BrowserRouter> */}
        </>
    );
}

export default App;
