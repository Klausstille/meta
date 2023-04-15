import { useState } from "react";

export default function Event({ data, setIsShown, setActiveIndex, index }) {
    const [showMore, setShowMore] = useState([]);
    const readMore = (index) => {
        setShowMore((prevShowMore) => {
            const newShowMore = [...prevShowMore];
            newShowMore[index] = !newShowMore[index];
            return newShowMore;
        });
    };
    const content = data.eventText.json.content;
    const showAll = showMore[index];

    return (
        <section className="events-grid" key={data.residencesPhotos.url}>
            <img
                alt={data.residencesPhotos.title}
                className="residences-pic"
                src={data.residencesPhotos.url}
                onClick={() => {
                    setIsShown(true);
                    setActiveIndex(index);
                }}
            />
            <h3 className="title-text">{data.residencesPhotos.title}</h3>
            <h3 className="description-text">{data.description}</h3>
            <div className="event-text">
                {showAll ? (
                    <div>
                        {content?.map((item, index) => {
                            return (
                                <p
                                    key={`index-item-${index}`}
                                    className="read-more-text"
                                >
                                    {item.content[0].value}
                                </p>
                            );
                        })}
                    </div>
                ) : (
                    <div>
                        <p className="read-more-text">
                            {content[0].content[0].value.substring(0, 150)}
                            <button
                                className="read-more-btn"
                                onClick={() => readMore(index)}
                            >
                                ...Read more
                            </button>
                        </p>
                    </div>
                )}
                {showAll && (
                    <button
                        className="read-more-btn"
                        onClick={() => readMore(index)}
                    >
                        Show less
                    </button>
                )}
            </div>
        </section>
    );
}
