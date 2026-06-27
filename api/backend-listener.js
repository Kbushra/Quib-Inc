import express from "express";
import app from "./backend.js";
import http from "http";
app.use((req, res, next) => {
    const redirectRegex = /^\/(game-page|quib-inc|mediaocre-games|team-thorn|local-games|showcase)($|\?|\/)/;
    if (req.url.match(redirectRegex)) {
        req.url = `/pages${req.url}`;
    }
    if (req.url == "/") {
        req.url = `/pages/quib-inc/info/`;
    }
    next();
});
app.use(express.static(process.cwd()));
app.use((req, res) => {
    res.status(404).sendFile(`${process.cwd()}/404.html`);
});
const httpServer = http.createServer(app);
httpServer.listen(3000, () => console.log("Running backend locally..."));
//# sourceMappingURL=backend-listener.js.map