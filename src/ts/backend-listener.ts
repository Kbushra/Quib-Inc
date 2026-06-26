import express from "express";
import app from "./backend.js";
import http from "http";

app.use((req : express.Request, res: express.Response, next) => 
{
    const redirectRegex = /^\/(game-page|info|local-games|otherorgs|projs|showcase)($|\?|\/)/;
    if (req.url.match(redirectRegex)) { req.url = `/pages${req.url}`; }

    next();
});

app.use(express.static(process.cwd()));

const httpServer = http.createServer(app);
httpServer.listen(3000, () => console.log("Running backend locally..."));