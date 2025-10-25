import express from "express";
import serverless from "serverless-http";
import { rateLimit } from "express-rate-limit";
import { configDotenv } from "dotenv";
configDotenv();

import supabase from "../supabase.js";

const app = express();

//import { join, dirname } from "path";
//import { fileURLToPath } from "url";
//app.use(express.static( join(dirname(fileURLToPath(import.meta.url)), "Frontend") ));

app.use(express.text());
app.use(express.json());

app.use(rateLimit(
{
    validate: false,
    skipFailedRequests: true,
    keyGenerator: (req: express.Request, res: express.Response) =>
    {
        let ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim()
        ?? req.socket?.remoteAddress
        ?? "unknown";

        return ip;
    }
}));

//SUPABASE SEARCHER SUBDOMAIN//
const supaRouter = express.Router();

supaRouter.post("/api/search", async (req: express.Request, res: express.Response) =>
{
    const fetched = await supabase.storage.from("Images").list("", { limit: 8, offset: req.body.page * 8, search: req.body.val });
    res.json(fetched);
});

supaRouter.post("/api/download", async (req: express.Request, res: express.Response) =>
{
    const fetched = await supabase.storage.from("Images").download(req.body);
    if (fetched.data == null) { res.send(""); return; }

    const arrBuff = await fetched.data?.arrayBuffer();
    const buff = Buffer.from(arrBuff);
    res.send(buff.toString("base64"));
});

app.use(supaRouter);
////////////////////////////////

//EMAIL REQUESTS//
const emailRouter = express.Router();
emailRouter.use(rateLimit({ windowMs: 30 * 1000, limit: 2 }));

emailRouter.post("/api/email-aaqib", async (req: express.Request, res: express.Response) =>
{
    try
    {
        let subj = req.body.subject as string ?? "";
        let email = req.body.email as string ?? "";
        let content = `Message from ${email == "" ? "<Anonymous>" : email}:\n\n${req.body.content as string ?? ""}`;

        if (subj.length > 100 || email.length > 100 || content.length > 1500)
        {
            res.status(413).end();
            return;
        }

        let response = await fetch("https://postmail.invotes.com/send",
        {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams
            ({
                access_token: process.env.EMAIL_KEY_AAQIB!,
                subject: subj! as string,
                text: content! as string
            })
        });

        if (response.status == 400) { res.status(503).end(); }
        res.status(response.ok ? 200 : 500);
    }
    catch
    {
        res.status(500);
    }

    res.end();
});

emailRouter.post("/api/email-undertem", async (req: express.Request, res: express.Response) =>
{
    try
    {
        let subj = req.body.subject as string ?? "";
        let email = req.body.email as string ?? "";
        let content = `Message from ${email == "" ? "<Anonymous>" : email}:\n\n${req.body.content as string ?? ""}`;

        if (subj.length > 100 || email.length > 100 || content.length > 1500)
        {
            res.status(413).end();
            return;
        }

        let response = await fetch("https://postmail.invotes.com/send",
        {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams
            ({
                access_token: process.env.EMAIL_KEY_UNDERTEM!,
                subject: subj! as string,
                text: content! as string
            })
        });

        if (response.status == 400) { res.status(503).end(); }
        res.status(response.ok ? 200 : 500);
    }
    catch
    {
        res.status(500);
    }

    res.end();
});

app.use(emailRouter);
////////////////////////////////

export default (req: express.Request, res: express.Response) => app(req, res);