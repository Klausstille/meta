import { useState, useEffect } from "react";
// import useMouse from "../components/mouseEvent/MouseMove";
// import getWindowDimensions from "../components/mouseEvent/DocumentSize";
import "./Cookies.css";

export default function Cookies() {
    useEffect(() => {
        const timeout = document.getElementById("cookie-modal");

        setTimeout(showElement, 2000);
        function showElement() {
            timeout.style.visibility = "visible";
        }
    }, []);

    function hideElement() {
        document.getElementById("cookie-modal").style.visibility = "hidden";
    }

    return (
        <div className="home">
            <div id="cookie-modal">
                <img
                    className="cookiehand"
                    src="./cookiehand.png"
                    alt="cookiehand"
                />
                <img className="cookie" src="./cookie.png" alt="cookie" />
                <button className="learn">Learn more</button>
                <button className="agree" onClick={hideElement}>
                    Agree &amp; Close
                </button>
                <h6 className="cookie-text">
                    By continuing to browse this site, you agree to the use of
                    cookies to identify your session and to remember your login
                    after you close the browser authentication cookies.
                </h6>
            </div>
        </div>
    );
}
