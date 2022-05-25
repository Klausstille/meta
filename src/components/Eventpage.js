export default function Eventpage({ i }) {
    return (
        <div>
            <h1 key={i.id}>{i.title}</h1>
            <img src={i.logo.file.url} className="App-logo" alt="logo" />
        </div>
    );
}
