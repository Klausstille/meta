import { Carousel } from "react-bootstrap";
import { useState } from "react";
import "./Carousel.css";

export default function ControlledCarousel({ props }) {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            className="carousel-container"
            variant="dark"
            fade
        >
            {props.map((data) => {
                return (
                    <Carousel.Item interval={3000}>
                        <div className="img-container">
                            <img
                                className="d-block w-100"
                                src={data.url}
                                alt=""
                            />
                        </div>
                        <Carousel.Caption>
                            <h3>{data.title}</h3>
                            <p className="carousel">{data.description}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                );
            })}
        </Carousel>
    );
}
