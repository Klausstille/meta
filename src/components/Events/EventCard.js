import { Link } from "react-router-dom";
import { CreateDate } from "../helpers/DateTime";

export default function EventCard({ data, en, slug }) {
    const content = data.eventText.json.content;
    const title = data.eventTitle;
    const srcUrl = data.residencesPhotos.url;
    return (
        <section className="events-grid" key={slug}>
            <Link to={`/events/${slug}`}>
                <img alt={title} className="residences-pic" src={srcUrl} />
            </Link>
            <p className="title-text">{title}</p>
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
                    <Link to={`/events/${slug}`}>
                        <button className="read-more-btn">
                            {en ? "...Read more ↸" : "...Lire plus ↸"}
                        </button>
                    </Link>
                </p>
            </div>
        </section>
    );
}
