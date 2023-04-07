// import { useState } from "react";
export default function Event({ data, setIsShown, setActiveIndex, index }) {
    return (
        <section className="events-grid" key={data.residencesPhotos.url}>
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
            <div className="event-text">
                {data.eventText.json.content?.map((data) => {
                    return (
                        <p key={data.content[0].value}>
                            {data.content[0].value}
                        </p>
                    );
                })}
            </div>
        </section>
    );
}
