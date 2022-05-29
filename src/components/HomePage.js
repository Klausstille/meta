import useMouse from "../components/mouseEvent/MouseMove";
import getWindowDimensions from "../components/mouseEvent/DocumentSize";
import "./HomePage.css";

export default function HomePage() {
    const { x, y } = useMouse();
    const { width } = getWindowDimensions();

    return (
        <div className="home">
            <div className="home-module">
                <div
                    className="logo-container"
                    style={{
                        width: `${width - x}px`,
                        height: `${y + 6}px`,
                    }}
                >
                    <img src="./logo_meta.png" alt="Meta" />
                </div>
            </div>
        </div>
    );
}
