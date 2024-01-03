import styled from "styled-components";
import { Colors } from "../../constants/colors";

const SideMenuContainer = styled.div`
  height: 100vh;
  width: 15%;
  background-color: ${Colors.sideMenuBackground};
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  padding: 10px;
  color: white;
`;

const SideMenuLink = styled.div`
  padding: 10px;
  margin: 10px;
  background-color: white;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
`;

const MenuFooter = styled.div`
  position: absolute;
  bottom: 5%;
`;

const DisconnectionButton = styled.div`
  border-radius: 10px;
  color: white;
  background: black;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InvitesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GameInvitesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const FriendRequestsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Notification = styled.div`
  background: ${Colors.notification};
  width: 10px;
  height: 10px;
  border-radius: 10px;
  position: absolute;
  top: 0;
  right: 0;
`;

export {
  SideMenuContainer,
  SideMenuLink,
  MenuFooter,
  DisconnectionButton,
  InvitesContainer,
  GameInvitesContainer,
  FriendRequestsContainer,
  Notification,
};
