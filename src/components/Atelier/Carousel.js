import "./Carousel.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-cube";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Pagination, Keyboard } from "swiper";

export default function Slideshow({ images, title }) {
    const minDelay = 2000;
    const maxDelay = 4000;
    const delay =
        Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
    return (
        <Swiper
            autoplay={{
                delay,
                disableOnInteraction: true,
                duration: 1000,
            }}
            pagination={false}
            loop={true}
            effect={"cube"}
            grabCursor={true}
            keyboard={{
                enabled: true,
            }}
            speed={1000}
            cubeEffect={{
                shadow: false,
                slideShadows: false,
                shadowOffset: 100,
                shadowScale: 1,
            }}
            modules={[Pagination, Autoplay, EffectCube, Keyboard]}
            className="mySwiper"
        >
            {images.items?.map((data, index) => {
                return (
                    <SwiperSlide>
                        <div
                            className="carousel-container"
                            key={`index-item-${index}`}
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
                            fig.{index + 1} - {data.description}
                        </p>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
}
