import "./Carousel.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-cube";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper";

export default function Slideshow({ images, title }) {
    return (
        <>
            <Swiper
                navigation={true}
                slidesPerView={1}
                spaceBetween={30}
                autoplay={{
                    delay: 5500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    type: "fraction",
                }}
                loop={true}
                modules={[Navigation, Autoplay, Keyboard]}
                className="mySwiper"
            >
                {images.items?.map((data, index) => {
                    const isVideo = data.url.includes("mp4");
                    return (
                        <SwiperSlide key={`index-item-${index}`}>
                            <div className="carousel-container">
                                {isVideo ? (
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
