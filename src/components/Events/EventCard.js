import { Link } from "react-router-dom";
import { CreateDate } from "../helpers/DateTime";

export default function EventCard({
    data,
    setIsShown,
    setActiveIndex,
    index,
    en,
    id,
}) {
    const content = data.eventText.json.content;

    return (
        <section className="events-grid" key={id}>
            <img
                alt={data.eventTitle}
                className="residences-pic"
                src={data.residencesPhotos.url}
                onClick={() => {
                    setIsShown(true);
                    setActiveIndex(index);
                }}
            />
            <p className="title-text">{data.eventTitle}</p>
            <div className="description-text">
                {CreateDate(data.startDate, data.endDate, "p")}
            </div>

            <div className="event-text">
                <div className="read-more-text">
                    {content[0].content[0].value.substring(0, 140)}
                    <Link to={`/events/${data.eventTitle}`}>
                        <button className="read-more-btn">
                            {en ? "...Read more" : "...Lire plus"}
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
