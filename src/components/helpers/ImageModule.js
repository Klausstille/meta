import { useState, useEffect } from "react";
import useMouse from "../helpers/mouseEvent/MouseMove";
import GetWindowDimensions from "../helpers/mouseEvent/DocumentSize";
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
    return (
        <>
            {page === "contact" && isShown && (
                <div
                    className="img-module-contact"
                    onClick={() => {
                        setIsShown(false);
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
                            <img
                                alt={data[0].bioTitle}
                                src={data[1].bioImage.url}
                                className="fixed-image"
                            />
                        ) : (
                            <>
                                <img
                                    alt={data[0].bioTitle}
                                    src={data[1].bioImage.url}
                                    className="fixed-image"
                                />
                                <img
                                    alt={data[0].bioTitle}
                                    src={data[1].bioImage.url}
                                    className="blurred-image"
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
            {page === "prod" && isShown && (
                <section
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
                            <img
                                alt={activeIndex.name}
                                active={activeIndex.isActive}
                                src={activeIndex.url}
                                className="fixed-image"
                            />
                        ) : (
                            <>
                                <img
                                    alt={activeIndex.name}
                                    active={activeIndex.isActive}
                                    src={activeIndex.url}
                                    className="fixed-image"
                                />
                                <img
                                    alt={activeIndex.name}
                                    active={activeIndex.isActive}
                                    src={activeIndex.url}
                                    className="blurred-image"
                                />
                            </>
                        )}

                        <h6 className="sticky-text">
                            {activeIndex.name}
                            {" | "}
                            {activeIndex.project}
                            {" | "}
                            {activeIndex.year}
                        </h6>
                    </div>
                </section>
            )}
            {page === "events" && isShown && (
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
                            <img
                                alt={data[activeIndex].eventTitle}
                                src={data[activeIndex].residencesPhotos.url}
                                className="fixed-image"
                            />
                        ) : (
                            <>
                                <img
                                    alt={data[activeIndex].eventTitle}
                                    src={data[activeIndex].residencesPhotos.url}
                                    className="fixed-image"
                                />
                                <img
                                    alt={data[activeIndex].eventTitle}
                                    src={data[activeIndex].residencesPhotos.url}
                                    className="blurred-image"
                                />
                            </>
                        )}

                        <h6 className="sticky-text">
                            {data[activeIndex].eventTitle} |{" "}
                            {new Date(
                                data[activeIndex].startDate
                            ).toLocaleDateString("fr", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })}{" "}
                            -{" "}
                            {new Date(
                                data[activeIndex].endDate
                            ).toLocaleDateString("fr", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })}
                        </h6>
                    </div>
                </div>
            )}
            {page === null && isShown && (
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
