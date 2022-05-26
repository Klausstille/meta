export const PicDrag = () => {
    let offsetX, offsetY;
    const move = (e) => {
        const el = e.target;
        el.style.left = `${e.pageX - offsetX}px`;
        el.style.top = `${e.pageY - offsetY}px`;
    };
    const add = (e) => {
        const el = e.target;
        offsetX = e.clientX - el.getBoundingClientRect().left;
        offsetY = e.clientY - el.getBoundingClientRect().top;
        el.addEventListener("mousemove", move);
    };
    const remove = (e) => {
        const el = e.target;
        el.removeEventListener("mousemove", move);
    };
};
