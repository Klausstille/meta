import { useState, useEffect } from "react";
import useMouse from "../helpers/mouseEvent/MouseMove";
import GetWindowDimensions from "../helpers/mouseEvent/DocumentSize";
import { CommonImageModule } from "./CommonImageModule";
export const ImageModule = ({
    data,
    activeIndex,
    setActiveIndex,
    setIsShown,
    isShown,
    page = null,
}) => {
    const { x, y } = useMouse();
    const { width } = GetWindowDimensions();
    const [preview, setPreview] = useState(null);
    const handleEscape = (event) => {
        if (event.keyCode === 27) {
            setIsShown(false);
        }
    };
    useEffect(() => {
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    });
    useEffect(() => {
        isShown && width <= 1200 ? setPreview(false) : setPreview(true);
    }, [isShown, width, setPreview]);

    let altText;
    let srcUrl;
    let stickyText;
    switch (page) {
        case "contact":
            srcUrl = data[1]?.bioImage.url;
            altText = data[0]?.bioTitle;
            stickyText = null;
            break;
        case "prod":
            srcUrl = activeIndex?.url;
            altText = activeIndex?.name;
            stickyText = `${activeIndex?.name} | ${activeIndex?.project} | ${activeIndex?.year}`;
            break;
        default:
            srcUrl = data[activeIndex]?.url;
            altText = data[activeIndex]?.description;
            stickyText = data[activeIndex]?.description;
            break;
    }
    return (
        <>
            {isShown && (
                <CommonImageModule
                    altText={altText}
                    srcUrl={srcUrl}
                    stickyText={stickyText}
                    preview={preview}
                    setIsShown={setIsShown}
                    setActiveIndex={setActiveIndex}
                    width={width}
                    x={x}
                    y={y}
                />
            )}
        </>
    );
};
