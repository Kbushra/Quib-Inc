import path from "path";
import express from "express";
import app from "./backend.js";
import http from "http";

app.use((req : express.Request, res: express.Response, next) => 
{
    if (req.url !== "/") { req.url = `/public${req.url}`; }
    next();
});

app.use(express.static(process.cwd()));

const httpServer = http.createServer(app);
httpServer.listen(3000, () => console.log("Running backend locally..."));