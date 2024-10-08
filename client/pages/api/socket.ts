import type { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
import { Server as IOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import { Socket as NetSocket } from "net";

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

export default function SocketHandler(
  _req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (res.socket.server.io) {
    res.end();
    return;
  }

  const io = new Server(res.socket.server);

  io.on("connect", (socket) => {
    socket.on("event", () => {
    });
    socket.on("disconnect", () => {});
  });
  (global as any).io = io;
  res.socket.server.io = io;
  res.end();

  res.send({});
}
