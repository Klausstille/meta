// import { useState } from "react";
export default function Events({
    data,
    setIsShown,
    setActiveIndex,
    index,
    en,
}) {
    // const [isReadMore, setIsReadMore] = useState(false);

    // function ReadMore({ children }) {
    //     const text = children;
    //     return (
    //         <div
    //             onClick={() => {
    //                 setIsReadMore((isReadMore) => !isReadMore);
    //             }}
    //         >
    //             {!isReadMore ? text[0] : text}

    //             {!isReadMore ? (
    //                 <div className="readmore">
    //                     {en ? <p>...read more</p> : <p>...lire plus</p>}
    //                 </div>
    //             ) : (
    //                 <div className="readmore">
    //                     {en ? <p>read less</p> : <p>lire moins</p>}
    //                 </div>
    //             )}
    //         </div>
    //     );
    // }

    return (
        <div className="events-grid" key={data.residencesPhotos.url}>
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

            {/* <ReadMore> */}
            {data.eventText.json.content.map((data) => {
                return (
                    <div className="event-text" key={data.content[0].value}>
                        <h6>{data.content[0].value}</h6>
                    </div>
                );
            })}
            {/* </ReadMore> */}
        </div>
    );
}
