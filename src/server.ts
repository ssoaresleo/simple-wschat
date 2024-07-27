import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.resolve(__dirname, "..", "public")));

export { httpServer, io };
