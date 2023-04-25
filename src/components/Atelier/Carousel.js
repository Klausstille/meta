import "./Carousel.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-cube";
import useMouse from "../helpers/mouseEvent/MouseMove";
import GetWindowDimensions from "../helpers/mouseEvent/DocumentSize";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Keyboard } from "swiper";
import { useState, useEffect } from "react";

export default function Slideshow({ images, title }) {
    const { x, y } = useMouse();
    const { width } = GetWindowDimensions();
    const [preview, setPreview] = useState(null);
    const [isShown, setIsShown] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    useEffect(() => {
        isShown && width <= 1200 ? setPreview(false) : setPreview(true);
    }, [isShown, width, setPreview]);

    const minDelay = 2000;
    const maxDelay = 4000;
    const delay =
        Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
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
                            images.items[activeIndex].url.includes("mp4") ? (
                                <video
                                    src={images.items[activeIndex].url}
                                    className="fixed-image"
                                    playsInline
                                    autoPlay
                                    loop
                                    muted
                                />
                            ) : (
                                <img
                                    alt={images.items[activeIndex].description}
                                    src={images.items[activeIndex].url}
                                    className="fixed-image"
                                />
                            )
                        ) : images.items[activeIndex].url.includes("mp4") ? (
                            <>
                                <video
                                    src={images.items[activeIndex].url}
                                    className="fixed-image"
                                    playsInline
                                    autoPlay
                                    loop
                                    muted
                                />
                                <video
                                    src={images.items[activeIndex].url}
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
                                    alt={images.items[activeIndex].description}
                                    src={images.items[activeIndex].url}
                                    className="fixed-image"
                                />
                                <img
                                    alt={images.items[activeIndex].description}
                                    src={images.items[activeIndex].url}
                                    className="blurred-image"
                                />
                            </>
                        )}

                        <h6 className="sticky-text">
                            {images.items[activeIndex].description}
                        </h6>
                    </div>
                </div>
            )}
            <Swiper
                autoplay={{
                    delay,
                    disableOnInteraction: true,
                    duration: 1000,
                }}
                speed={1000}
                loop={true}
                effect={"cube"}
                grabCursor={true}
                keyboard={{
                    enabled: true,
                }}
                cubeEffect={{
                    shadow: false,
                    slideShadows: false,
                    shadowOffset: 100,
                    shadowScale: 1,
                }}
                modules={[Autoplay, EffectCube, Keyboard]}
                className="mySwiper"
            >
                {images.items?.map((data, index) => {
                    return (
                        <SwiperSlide key={`index-item-${index}`}>
                            <div
                                className="carousel-container"
                                onClick={() => {
                                    setIsShown(true);
                                    setActiveIndex(index);
                                }}
                            >
                                {data.url.includes("mp4") ? (
                                    <video
                                        src={data.url}
                                        playsInline
                                        autoPlay
                                        loop
                                        muted
                                    />
                                ) : (
                                    <img
                                        className="d-block w-100"
                                        src={data.url}
                                        alt={title}
                                    />
                                )}
                            </div>
                            <p className="carousel-caption">
                                {index + 1}/{images.items.length} •{" "}
                                {data.description}
                            </p>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
}
