// import { useState, useEffect } from "react";
// import useContenful from "./useContenful";
// import Eventpage from "./components/Eventpage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import useMouse from "./components/mouseEvent/MouseMove";
import getWindowDimensions from "./components/mouseEvent/DocumentSize";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Residences from "./components/Residences";

function App() {
    // const [page, setPage] = useState([]);
    // const { getNav } = useContenful();
    const { x, y } = useMouse();
    const { width, height } = getWindowDimensions();

    // useEffect(() => {
    //     getNav().then((response) => {
    //         setPage(response);
    //     });
    // });

    return (
        <>
            <BrowserRouter>
                <Navbar />

                <svg className="canvas">
                    <line class="hand" x1={x} y1={y} x2={x} y2="0" />
                    <line class="hand" x1={x} y1={y} x2="0" y2={height} />
                    <line class="hand" x1={x} y1={y} x2={width} y2={y} />
                </svg>
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
