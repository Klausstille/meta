import { useState, useEffect } from "react";
import useContenful from "./useContenful";
// import Eventpage from "./components/Eventpage";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import useMouse from "./components/mouseEvent/MouseMove";
import getWindowDimensions from "./components/mouseEvent/DocumentSize";
import HomePage from "./components/HomePage";

function App() {
    const [page, setPage] = useState([]);
    const { getNav } = useContenful();
    const { x, y } = useMouse();
    const { width, height } = getWindowDimensions();

    useEffect(() => {
        getNav().then((response) => {
            setPage(response);
        });
        // getHomePage().then((response) => {
        //     setPage(response);
        // });
    });

    return (
        <>
            <svg className="canvas">
                <line class="hand" x1={x} y1={y} x2={x} y2="0" />
                <line class="hand" x1={x} y1={y} x2="0" y2={height} />
                <line class="hand" x1={x} y1={y} x2={width} y2={y} />
            </svg>
            <Router>
                <Navbar />
                {/* <Switch>
                    <Route exact path="/" />
                </Switch> */}
            </Router>
            <HomePage />
            {/* {page.map((i) => (
                <div>
                    <h1 key={i.id}>{i.title}</h1>
                    <img
                        src={i.logo.file.url}
                        className="App-logo"
                        alt="logo"
                    />
                </div>
            ))} */}
        </>
    );
}

export default App;
