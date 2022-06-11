import useMouse from "../components/mouseEvent/MouseMove";
import getWindowDimensions from "../components/mouseEvent/DocumentSize";
import "./HomePage.css";
import Footer from "./Footer";

export default function HomePage({ lang = "fr" }) {
    const { x, y } = useMouse();
    const { width } = getWindowDimensions();

    return (
        <>
            <div className="home">
                <div className="home-module">
                    {y > 80 ? (
                        <div
                            className="logo-container"
                            style={{
                                width: `${width - x}px`,
                                height: `${y - 64}px`,
                            }}
                        >
                            <img src="./logo_meta.png" alt="Meta" />
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
                <div className="hero-container">
                    <video src="./amalia.mp4" autoPlay loop muted />
                </div>
            </div>
            <footer className="home-footer">
                <Footer lang={lang} />
            </footer>
        </>
    );
}
