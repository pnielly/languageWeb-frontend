import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import menuLinks from "../../constants/menu";
import useCurrentUser from "../../hooks/currentUser";
import { useContext, useEffect } from "react";
import { SocketContext } from "../../contexts/sockets";
import { useDispatch, useSelector } from "react-redux";
import store, { logout } from "../../redux/store";
import {
  DisconnectionButton,
  FriendRequestsContainer,
  GameInvitesContainer,
  InvitesContainer,
  MenuFooter,
  Notification,
  SideMenuContainer,
  SideMenuLink,
} from "./sideMenuStyles";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import { Colors } from "../../constants/colors";

const SideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const me = useCurrentUser();
  const sockContext = useContext(SocketContext);
  const dispatch = useDispatch();
  const friendsPath =
    menuLinks[menuLinks.findIndex((l) => l.name === "Friends")].path;

    useEffect(() => {}, [location]);

  const handleHelloWorldClick = async () => {
    try {
      await axios.get("http://localhost:3001");
      console.log("Success calling backend");
    } catch (error) {
      console.error("Error calling backend:", error);
    }
  };

  const handleDisconnection = () => {
    sockContext.socketUsers.emit("offline", { userId: me?.id });
    dispatch(logout());
    sessionStorage.removeItem("token");
  };

  const getMenuTabStyle = (link: any) => {
    return {
      backgroundColor: location.pathname.includes(link.path)
        ? "white"
        : `${Colors.sideMenuBackground}`,
      color: location.pathname.includes(link.path) ? "black" : "white",
    };
  };

  const senderIds = useSelector((state: any) => store.getState().game.senderIds);

  useEffect(() => {
    console.log("store", senderIds);
  }, [senderIds]);

  return (
    <SideMenuContainer>
      {menuLinks.map((link) => {
        if (!link.display) return null;
        return (
          <SideMenuLink
            key={link.path}
            onClick={() => navigate(link.path)}
            style={getMenuTabStyle(link)}
          >
            {link.name}
          </SideMenuLink>
        );
      })}
      <InvitesContainer>
        <GameInvitesContainer onClick={() => navigate(`${friendsPath}?from=gameInvite`)}>
          {senderIds.length ? <Notification /> : null}
          <SportsEsportsOutlinedIcon />
        </GameInvitesContainer>
        <FriendRequestsContainer></FriendRequestsContainer>
      </InvitesContainer>
      <MenuFooter>
        <DisconnectionButton onClick={handleDisconnection}>
          Déconnexion
        </DisconnectionButton>
        <p>{"currentUser: " + me?.pseudo}</p>
        <button onClick={handleHelloWorldClick}>Say Hello to Backend</button>
      </MenuFooter>
    </SideMenuContainer>
  );
};

export default SideMenu;
