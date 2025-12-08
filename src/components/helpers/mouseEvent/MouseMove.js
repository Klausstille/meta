import { useState, useEffect } from "react";

export default function useMouse() {
    const [mousePosition, setMousePosition] = useState({
        x: null,
        y: null,
    });

    useEffect(() => {
        function handleMouse(e) {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        }

        function handleTouch(e) {
            if (e.touches.length > 0) {
                setMousePosition({
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY,
                });
            }
        }

        document.addEventListener("mousemove", handleMouse);
        document.addEventListener("touchmove", handleTouch);
        document.addEventListener("touchstart", handleTouch);

        return () => {
            document.removeEventListener("mousemove", handleMouse);
            document.removeEventListener("touchmove", handleTouch);
            document.removeEventListener("touchstart", handleTouch);
        };
    });

    return mousePosition;
}
