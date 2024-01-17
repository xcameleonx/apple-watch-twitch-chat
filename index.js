const express = require("express");
const settings = require("./settings.json");
const app = express();
const port = settings.port;


app.use(express.static("public"));

app.get("/settings", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(settings);
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});