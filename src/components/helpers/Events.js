import { useState } from "react";

export default function Events({
    data,
    setIsShown,
    setActiveIndex,
    index,
    en,
}) {
    const [isReadMore, setIsReadMore] = useState(false);

    const ReadMore = ({ children }) => {
        const text = children;
        return (
            <div className="text">
                {!isReadMore ? text[0] : text}
                <div
                    className="read-or-hide"
                    onClick={() => {
                        setIsReadMore((isReadMore) => !isReadMore);
                    }}
                >
                    {!isReadMore ? (
                        <p className="readmore">
                            {en ? <p>...read more</p> : <p>...lire plus</p>}
                        </p>
                    ) : (
                        <p className="readmore">
                            {en ? <p>read less</p> : <p>lire moins</p>}
                        </p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="events-grid" key={data.residencesPhotos.url}>
            <div key={data.residencesPhotos.url}>
                <img
                    alt={data}
                    className="residences-pic"
                    src={data.residencesPhotos.url}
                    onClick={() => {
                        setIsShown(true);
                        setActiveIndex(index);
                    }}
                />
                <h3 className="title-text">{data.residencesPhotos.title}</h3>
                <h3 className="description-text">{data.description}</h3>
            </div>
            <div className="event-text">
                <ReadMore>
                    {data.eventText.json.content.map((data) => {
                        return (
                            <div key={data.content[0].value}>
                                <h6>{data.content[0].value}</h6>
                            </div>
                        );
                    })}
                </ReadMore>
            </div>
        </div>
    );
}
