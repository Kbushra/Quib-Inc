import express from "express";
import http from "http";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const app = express();

app.set("subdomain offset", 1)

app.use((req: express.Request, res: express.Response, next) =>
{
    if (req.subdomains.includes("examples"))
    {
        express.static( join(dirname(fileURLToPath(import.meta.url)), "Examples") )(req, res, next);
    }
    else
    {
        express.static( join(dirname(fileURLToPath(import.meta.url)), "Frontend") )(req, res, next);
    }
});

app.use(express.text());
app.use(express.json());

const router = express.Router();

app.use(router);
const server = http.createServer(app);
server.listen(3000, "0.0.0.0", () => { console.log("Listening..."); })