export const CommonImageModule = ({
    altText,
    srcUrl,
    stickyText,
    preview,
    setIsShown,
    setActiveIndex,
    width,
    x,
    y,
}) => {
    return (
        <div
            className="img-module"
            onClick={() => {
                setIsShown(false);
                setActiveIndex && setActiveIndex(-1);
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
                    srcUrl?.includes("mp4") ? (
                        <video
                            src={srcUrl}
                            className="fixed-image"
                            playsInline
                            autoPlay
                            loop
                            muted
                        />
                    ) : (
                        <img
                            alt={altText}
                            src={srcUrl}
                            className="fixed-image"
                        />
                    )
                ) : srcUrl.includes("mp4") ? (
                    <>
                        <video
                            src={srcUrl}
                            className="fixed-image"
                            playsInline
                            autoPlay
                            loop
                            muted
                        />
                        <video
                            src={srcUrl}
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
                            alt={altText}
                            src={srcUrl}
                            className="fixed-image"
                        />
                        <img
                            alt={altText}
                            src={srcUrl}
                            className="blurred-image"
                        />
                    </>
                )}

                {stickyText && <h6 className="sticky-text">{stickyText}</h6>}
            </div>
        </div>
    );
};
