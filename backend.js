import express from "express";
import { rateLimit } from "express-rate-limit";
import https from "https";
import fs from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import supabase from "./supabase.js";
const app = express();
app.set("subdomain offset", 1);
app.use((req, res, next) => {
    if (req.subdomains.length == 1) {
        switch (req.subdomains[0]) {
            case "testimonial":
                express.static(join(dirname(fileURLToPath(import.meta.url)), "Subdomains/testimonial"))(req, res, next);
                break;
            case "progress":
                express.static(join(dirname(fileURLToPath(import.meta.url)), "Subdomains/progress"))(req, res, next);
                break;
            case "searcher":
                express.static(join(dirname(fileURLToPath(import.meta.url)), "Subdomains/searcher"))(req, res, next);
                break;
            case "screensaver":
                express.static(join(dirname(fileURLToPath(import.meta.url)), "Subdomains/screensaver"))(req, res, next);
                break;
            default:
                express.static(join(dirname(fileURLToPath(import.meta.url)), "Frontend"))(req, res, next);
                break;
        }
    }
    else {
        express.static(join(dirname(fileURLToPath(import.meta.url)), "Frontend"))(req, res, next);
    }
});
app.use(express.text());
app.use(express.json());
//SUPABASE SEARCHER SUBDOMAIN//
const supaRouter = express.Router();
supaRouter.post("/search", async (req, res) => {
    const fetched = await supabase.storage.from("Images").list("", { limit: 8, offset: req.body.page * 8, search: req.body.val });
    res.json(fetched);
});
supaRouter.post("/download", async (req, res) => {
    const fetched = await supabase.storage.from("Images").download(req.body);
    if (fetched.data == null) {
        res.send("");
        return;
    }
    const arrBuff = await fetched.data?.arrayBuffer();
    const buff = Buffer.from(arrBuff);
    res.send(buff.toString("base64"));
});
app.use(supaRouter);
////////////////////////////////
//EMAIL REQUESTS//
const emailRouter = express.Router();
emailRouter.use(rateLimit({ windowMs: 30 * 1000, limit: 2 }));
emailRouter.post("/email-aaqib", async (req, res) => {
    try {
        let subj = req.body.subject ?? "";
        let email = req.body.email ?? "";
        let content = `Message from ${email == "" ? "<Anonymous>" : email}:\n\n${req.body.content ?? ""}`;
        if (subj.length > 100 || email.length > 100 || content.length > 1500) {
            res.status(413).end();
            return;
        }
        let response = await fetch("https://postmail.invotes.com/send", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                access_token: process.env.EMAIL_KEY_AAQIB,
                subject: subj,
                text: content
            })
        });
        if (response.status == 400) {
            res.status(503).end();
        }
        res.status(response.ok ? 200 : 500);
    }
    catch {
        res.status(500);
    }
    res.end();
});
emailRouter.post("/email-undertem", async (req, res) => {
    try {
        let subj = req.body.subject ?? "";
        let email = req.body.email ?? "";
        let content = `Message from ${email == "" ? "<Anonymous>" : email}:\n\n${req.body.content ?? ""}`;
        if (subj.length > 100 || email.length > 100 || content.length > 1500) {
            res.status(413).end();
            return;
        }
        let response = await fetch("https://postmail.invotes.com/send", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                access_token: process.env.EMAIL_KEY_UNDERTEM,
                subject: subj,
                text: content
            })
        });
        if (response.status == 400) {
            res.status(503).end();
        }
        res.status(response.ok ? 200 : 500);
    }
    catch {
        res.status(500);
    }
    res.end();
});
app.use(emailRouter);
////////////////////////////////
const server = https.createServer({ key: fs.readFileSync("quibinc.dpdns.org.key"), cert: fs.readFileSync("quibinc.dpdns.org.pem") }, app);
server.listen(443, "0.0.0.0", () => { console.log("Listening..."); });
//# sourceMappingURL=backend.js.map