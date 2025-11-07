// socket.ts
import { io, Socket } from "socket.io-client";
import { apiUrl } from "@/config";

// Exporte une seule instance pour toute l'application
export const socket: Socket = io(apiUrl);
