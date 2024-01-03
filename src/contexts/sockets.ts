import { createContext } from "react";
import io, { Socket } from "socket.io-client";

interface Context {
  // socketChat: Socket;
  socketUsers: Socket;
}

// export const socketChat = io("localhost:3000/chat");

// socketUsers is used for friendRequests, gameInvites and online status
export const socketUsers = io("localhost:3000/users");

export const SocketContext = createContext<Context>({
  // socketChat,
  socketUsers,
});
