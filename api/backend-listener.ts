import app from "./backend.ts";
import http from "http";

const httpServer = http.createServer(app);
httpServer.listen(3000, () => console.log("Running backend locally..."));