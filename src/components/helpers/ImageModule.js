import { useState, useEffect } from "react";
import useMouse from "../helpers/mouseEvent/MouseMove";
import GetWindowDimensions from "../helpers/mouseEvent/DocumentSize";
export const ImageModule = ({
    data,
    activeIndex,
    setActiveIndex,
    setIsShown,
    isShown,
}) => {
    const { x, y } = useMouse();
    const { width } = GetWindowDimensions();
    const [preview, setPreview] = useState(null);
    useEffect(() => {
        isShown && width <= 1200 ? setPreview(false) : setPreview(true);
    }, [isShown, width, setPreview]);
    return (
        <>
            {isShown && (
                <div
                    className="img-module"
                    onClick={() => {
                        setIsShown(false);
                        setActiveIndex(-1);
                    }}
                >
                    <div
                        className="image-container"
                        style={
                            preview
                                ? {
                                      width: `${width - x}px`,
                                      height: `${y - 1}px`,
                                  }
                                : {
                                      width: `100%`,
                                      height: `100%`,
                                  }
                        }
                    >
                        {preview ? (
                            data[activeIndex].url.includes("mp4") ? (
                                <video
                                    src={data[activeIndex].url}
                                    className="fixed-image"
                                    playsInline
                                    autoPlay
                                    loop
                                    muted
                                />
                            ) : (
                                <img
                                    alt={data[activeIndex].description}
                                    src={data[activeIndex].url}
                                    className="fixed-image"
                                />
                            )
                        ) : data[activeIndex].url.includes("mp4") ? (
                            <>
                                <video
                                    src={data[activeIndex].url}
                                    className="fixed-image"
                                    playsInline
                                    autoPlay
                                    loop
                                    muted
                                />
                                <video
                                    src={data[activeIndex].url}
                                    className="blurred-image"
                                    playsInline
                                    autoPlay
                                    loop
                                    muted
                                />
                            </>
                        ) : (
                            <>
                                <img
                                    alt={data[activeIndex].description}
                                    src={data[activeIndex].url}
                                    className="fixed-image"
                                />
                                <img
                                    alt={data[activeIndex].description}
                                    src={data[activeIndex].url}
                                    className="blurred-image"
                                />
                            </>
                        )}

                        <h6 className="sticky-text">
                            {data[activeIndex].description}
                        </h6>
                    </div>
                </div>
            )}
        </>
    );
};
