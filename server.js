const express = require("express");
const app = express();

app.use(express.static(`${__dirname}/build`));

app.use(express.json());

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/build/index.html`);
});

app.listen(3000, () => console.log(`I'm listening.`));
