import { useState, useEffect } from "react";

export default function useMouse() {
    const [mousePosition, setMousePosition] = useState({
        x: null,
        y: null,
    });

    useEffect(() => {
        function handle(e) {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        }

        document.addEventListener("mousemove", handle);
        return () => document.removeEventListener("mousemove", handle);
    });

    return mousePosition;
}
