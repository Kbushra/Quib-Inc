import express from "express";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import { configDotenv } from "dotenv";
configDotenv();
const app = express();
app.use(cors());
app.use(express.text());
app.use(express.json());
app.use((req, res, next) => {
    const allowed = [
        "http://localhost:5500",
        "http://localhost:3000",
        "https://quib-inc.vercel.app",
        "https://quibinc.dpdns.org",
        "https://keepchatting.neocities.org"
    ];
    const origin = req.headers.origin;
    if (origin && allowed.includes(origin)) {
        //Allow origin
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Content-Type-Options');
    }
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});
////////////////////////////////
//EMAIL REQUESTS//
const emailRouter = express.Router();
emailRouter.use("/api/email", rateLimit({ windowMs: 30 * 1000, limit: 2 }));
emailRouter.post("/api/email", async (req, res) => {
    try {
        const tok = req.body.dest == "aaqibchoudhury3@gmail.com" ? process.env.EMAIL_KEY_AAQIB :
            req.body.dest == "undertemtheshitpost@gmail.com" ? process.env.EMAIL_KEY_MEDIAOCRE : "";
        if (tok == "") {
            res.status(400).end();
            return;
        }
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
                access_token: tok,
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
export default app;
//# sourceMappingURL=backend.js.map