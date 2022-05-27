import { useState, useEffect } from "react";

export default function GetWindowDimensions() {
    const [params, setParams] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [resize, setResize] = useState(false);

    useEffect(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        document.addEventListener("resize", () => setResize(true));
        setParams({
            ...params,
            width: width,
            height: height,
        });
    }, [params]);

    return params;
}
