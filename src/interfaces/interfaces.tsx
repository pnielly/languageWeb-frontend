export type Mode = "Vocabulary" | "Video";

export type IColorTheme = {
  lightColor: string;
  color: string;
  darkColor: string;
};

export type User = {
  createdAt: any;
  email: string;
  id: number;
  pseudo: string | null;
};

export type UserOverview = {
  id: number;
  pseudo: string;
  online: boolean;
  isFriend: boolean;
  friendRequestId: number;
  sentFriendRequest: boolean;
  level: number;
};

export type Message = {
  senderId: number;
  text: string;
  date: any;
};

export type ChatChannel = {
  userId: number;
  pseudo: string;
  isFriend: boolean;
  lastMessage: string;
};
