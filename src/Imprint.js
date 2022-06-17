import Footer from "./components/Footer";

function Imprint({ lang = "fr" }) {
    return (
        <>
            <div className="events-container">
                <p>
                    Design and Development: <br />
                    <a
                        href="http://www.stillestudio.com"
                        target="blank"
                        style={{ textDecoration: "none" }}
                    >
                        Klaus Stille
                    </a>
                </p>
            </div>
            <footer>
                <Footer lang={lang} />
            </footer>
        </>
    );
}

export default Imprint;
