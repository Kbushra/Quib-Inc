import app from "./src/backend.js";
import http from "http";
const httpServer = http.createServer(app);
httpServer.listen(3000, () => console.log("Running backend locally..."));
//# sourceMappingURL=backend-listener.js.map