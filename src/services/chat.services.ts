import { ChatChannel, Message } from "../interfaces/interfaces";
import { api } from "../utils/API";

const ChatServices = {
  getConversation: async (id: string) =>
    api.get<Message[]>("messages/getConversation/" + id),
  setMessagesAsRead: async (id: string) =>
    api.post<any>("messages/updateReadMessage/" + id),
  getChannels: async () => api.get<ChatChannel[]>("messages/getChannels"),
} as const;
export default ChatServices;
