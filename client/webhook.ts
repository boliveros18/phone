import { useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";

export enum WebsocketEventEnum {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  MESSAGE = "message",
  EVENT = "event",
}

const useWebSocketConnectionHook = (
  cb: (arg: unknown) => void,
  event: WebsocketEventEnum
) => {
  const socketRef = useRef<any>(null);

  const socketClient = useCallback(() => {
    const socket = io("https://phone-server-production.up.railway.app", {
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      socket.on(event as unknown as string, (data) => {
        cb(data);
      });
    });

    socket.on("disconnect", () => {});
    socket.on("connect_error", async (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    socketRef.current = socket;
  }, [cb, event]);

  useEffect(() => {
    socketClient();
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [socketClient]);
};

export default useWebSocketConnectionHook;
