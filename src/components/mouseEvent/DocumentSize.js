import { useState, useEffect } from "react";
// var canvas = document.getElementById("canvas");

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        document.addEventListener("resize", handleResize);
        return () => document.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}
