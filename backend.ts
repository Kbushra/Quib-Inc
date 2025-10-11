import express from "express";
import http from "http";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.static( join(dirname(fileURLToPath(import.meta.url)), "Frontend") ));
app.use(express.text());
app.use(express.json());

const router = express.Router();

app.use(router);
const server = http.createServer(app);
server.listen(3000, "0.0.0.0", () => { console.log("Listening..."); })