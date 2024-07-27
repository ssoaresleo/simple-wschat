import { httpServer } from "./server";

import "./websocket";

httpServer.listen(3333, () => {
  console.log("HTTP server running!");
});
