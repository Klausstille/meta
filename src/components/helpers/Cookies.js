import { useEffect } from "react";
import useMouse from "../mouseEvent/MouseMove";
import getWindowDimensions from "../mouseEvent/DocumentSize";
import "./Cookies.css";

export default function Cookies() {
    const { x, y } = useMouse();
    const { width, height } = getWindowDimensions();

    useEffect(() => {
        const timeout = document.getElementById("cookie-modal");
        timeout.style.visibility = "visible";
    }, []);

    function hideElement() {
        document.getElementById("cookie-modal").style.visibility = "hidden";
        localStorage.setItem("consent", "ok");
        window.location.reload();
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
                        By continuing to browse this site, you agree to the use
                        of cookies to identify your session and to remember your
                        login after you close the browser authentication
                        cookies.
                    </h6>
                </div>
            </div>
        </>
    );
}
