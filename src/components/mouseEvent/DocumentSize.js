import { useState, useEffect } from "react";

export default function GetWindowDimensions() {
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
    });

    useEffect(() => {
        let abort = false;
        function handleResize() {
            if (!abort) {
                setDimensions({
                    height: window.innerHeight,
                    width: window.innerWidth,
                });
            }
        }
        window.addEventListener("resize", handleResize);
        return () => (abort = true);
    });

    return dimensions;
}
