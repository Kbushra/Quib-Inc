import express from "express";
import http from "http";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import supabase from "./supabase.ts";

const app = express();

app.set("subdomain offset", 1)

app.use((req: express.Request, res: express.Response, next) =>
{
    if (req.subdomains.length == 1)
    {
        switch (req.subdomains[0])
        {
            case "testimonial":
                express.static( join(dirname(fileURLToPath(import.meta.url)), "Subdomains/testimonial") )(req, res, next);
                break;
            
            case "progress":
                express.static( join(dirname(fileURLToPath(import.meta.url)), "Subdomains/progress") )(req, res, next);
                break;
            
            case "searcher":
                express.static( join(dirname(fileURLToPath(import.meta.url)), "Subdomains/searcher") )(req, res, next);
                break;
            
            case "screensaver":
                express.static( join(dirname(fileURLToPath(import.meta.url)), "Subdomains/screensaver") )(req, res, next);
                break;

            default:
                express.static( join(dirname(fileURLToPath(import.meta.url)), "Frontend") )(req, res, next);
                break;
        }
    }
    else
    {
        express.static( join(dirname(fileURLToPath(import.meta.url)), "Frontend") )(req, res, next);
    }
});

app.use(express.text());
app.use(express.json());

//SUPABASE SEARCHER SUBDOMAIN//
const router = express.Router();

router.post("/search", async (req: express.Request, res: express.Response) =>
{
    const fetched = await supabase.storage.from("Images").list("", { limit: 8, offset: req.body.page * 8, search: req.body.val });
    res.json(fetched);
});

router.post("/download", async (req: express.Request, res: express.Response) =>
{
    const fetched = await supabase.storage.from("Images").download(req.body);
    if (fetched.data == null) { res.send(""); return; }

    const arrBuff = await fetched.data?.arrayBuffer();
    const buff = Buffer.from(arrBuff);
    res.send(buff.toString("base64"));
});

app.use(router);
////////////////////////////////

const server = http.createServer(app);
server.listen(3000, "0.0.0.0", () => { console.log("Listening..."); })