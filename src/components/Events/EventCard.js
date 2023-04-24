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
                <CreateDate
                    start={data.startDate}
                    end={data.endDate}
                    el={"p"}
                />
            </div>

            <div className="event-text">
                <p className="read-more-text">
                    {content[0].content[0].value
                        .split(" ")
                        .slice(0, 17)
                        .join(" ")}
                    <Link to={`/events/${id}`}>
                        <button className="read-more-btn">
                            {en ? "...Read more ↸" : "...Lire plus ↸"}
                        </button>
                    </Link>
                </p>
            </div>
        </section>
    );
}
