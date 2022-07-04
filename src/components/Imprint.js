import Footer from "./Footer";

function Imprint({ lang = "fr" }) {
    return (
        <>
            <div className="events-container">
                <div>
                    <h1 style={{ textAlign: "left", paddingTop: "0" }}>
                        Atelier Meta
                        <br />
                        Productions Plastiques Les Faures
                        <br />
                        24560 Ste Radegonde
                        <br />
                        <a
                            style={{ textDecoration: "none" }}
                            href="mailto:inbox.meta@gmail.com"
                        >
                            inbox.meta(at)gmail.com
                        </a>
                        <br />
                        +33(0)7 6246 6770
                    </h1>
                </div>
                <div>
                    <h1 style={{ textAlign: "left", paddingTop: "0" }}>
                        Website concept, design
                        <br />
                        and development: <br />
                        <a
                            href="http://www.stillestudio.com"
                            target="blank"
                            style={{ textDecoration: "none" }}
                        >
                            Klaus Stille
                        </a>
                    </h1>
                </div>
            </div>
            <footer>
                <Footer lang={lang} />
            </footer>
        </>
    );
}

export default Imprint;
