import Connection from "../pages/Connection";
import Home from "../pages/Home/Home";
import Users from "../pages/Users/Users";
import ChatMenu from "../pages/Chat/ChatMenu/ChatMenu";
import ChatChannel from "../pages/Chat/ChatChannel/ChatChannel";

const menuLinks = [
  {
    name: "Home",
    path: "/home",
    component: Home,
    display: true,
  },
  {
    name: "Login",
    path: "/login",
    component: Connection,
    display: false,
  },
  {
    name: "Friends",
    path: "/users",
    component: Users,
    display: true,
  },
  {
    name: "Chat",
    path: "/chat",
    component: ChatMenu,
    display: true,
  },
  {
    name: "Channel",
    path: "/chat/:otherUserId",
    component: ChatChannel,
    display: false,
  },
];

export default menuLinks;
