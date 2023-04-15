import { useState } from "react";

export default function Event({ data, setIsShown, setActiveIndex, index, en }) {
    const [showMore, setShowMore] = useState([]);
    const readMore = (index) => {
        setShowMore((prevShowMore) => {
            const newShowMore = [...prevShowMore];
            newShowMore[index] = !newShowMore[index];
            return newShowMore;
        });
    };

    const formatDate = (date) =>
        new Intl.DateTimeFormat("fr", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(date);

    const formatTime = (date) =>
        new Intl.DateTimeFormat("fr", {
            hour: "2-digit",
            minute: "2-digit",
        }).format(date);

    const startDate = formatDate(new Date(data.startDate));
    const endDate = formatDate(new Date(data.endDate));
    const startTime = formatTime(new Date(data.startDate));
    const endTime = formatTime(new Date(data.endDate));
    const content = data.eventText.json.content;
    const showAll = showMore[index];

    return (
        <section className="events-grid" key={data.eventTitle}>
            <img
                alt={data.eventTitle}
                className="residences-pic"
                src={data.residencesPhotos.url}
                onClick={() => {
                    setIsShown(true);
                    setActiveIndex(index);
                }}
            />
            <h3 className="title-text">{data.eventTitle}</h3>
            <p className="description-text">
                {startDate} - {endDate}
                {endTime && startTime !== "00:00"
                    ? ` | ${startTime}-${endTime}`
                    : ""}
            </p>

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
                                {en ? "...Read more" : "...Lire plus"}{" "}
                            </button>
                        </p>
                    </div>
                )}
                {showAll && (
                    <button
                        className="read-more-btn"
                        onClick={() => readMore(index)}
                    >
                        {en ? "Show less" : "Réduire"}
                    </button>
                )}
            </div>
        </section>
    );
}
