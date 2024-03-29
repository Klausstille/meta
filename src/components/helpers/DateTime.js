export function CreateDate({ start = null, end = null, el }) {
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
    const startDate = formatDate(new Date(start));
    const endDate = formatDate(new Date(end));
    const startTime = formatTime(new Date(start));
    const endTime = formatTime(new Date(end));
    return (
        <>
            {el === "article" && (
                <p className="published">published on {startDate}</p>
            )}
            {el === "p" && (
                <p>
                    {startDate === endDate
                        ? startDate
                        : `${startDate}-${endDate}`}
                    {endTime !== "00:00" && startTime !== "00:00"
                        ? ` | ${startTime}-${endTime}`
                        : ""}
                </p>
            )}
            {!el && (
                <>
                    <h3>
                        {startDate === endDate
                            ? startDate
                            : `${startDate}-${endDate}`}
                    </h3>
                    <h3>
                        {endTime && startTime !== "00:00"
                            ? `${startTime}-${endTime}`
                            : ""}
                    </h3>
                </>
            )}
        </>
    );
}
