import { Carousel } from "react-bootstrap";
import { useState } from "react";
import { ReactComponent as CustomPrevIcon } from "../../assets/prev.svg";
import { ReactComponent as CustomNextIcon } from "../../assets/next.svg";
import "./Carousel.css";

export default function Slideshow({ images }) {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel
            prevIcon={<CustomPrevIcon />}
            nextIcon={<CustomNextIcon />}
            activeIndex={index}
            onSelect={handleSelect}
            className="carousel-container"
            variant="dark"
            fade
        >
            {images.items?.map((data, index) => {
                return (
                    <Carousel.Item interval={3000} key={`index-item-${index}`}>
                        <div className="img-container">
                            <img
                                className="d-block w-100"
                                src={data.url}
                                alt=""
                            />
                        </div>
                        {/* <Carousel.Caption>
                            <h3>{data.title}</h3>
                            <p className="carousel">{data.description}</p>
                        </Carousel.Caption> */}
                    </Carousel.Item>
                );
            })}
        </Carousel>
    );
}
