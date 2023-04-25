import "./Carousel.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-cube";
import { Autoplay } from "swiper";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Keyboard } from "swiper";
import { ImageModule } from "../helpers/ImageModule";

export default function Slideshow({ images, title }) {
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isShown, setIsShown] = useState(false);
    const minDelay = 2000;
    const maxDelay = 4000;
    const delay =
        Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
    return (
        <>
            <ImageModule
                data={images.items}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                isShown={isShown}
                setIsShown={setIsShown}
                page="atelier"
            />
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
