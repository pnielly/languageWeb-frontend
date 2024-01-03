import { Route, Routes } from "react-router-dom";
import Connection from "./Connection";
import { useDispatch, useSelector } from "react-redux";
import menuLinks from "../constants/menu";
import { useContext, useEffect } from "react";
import { SocketContext } from "../contexts/sockets";
import { addGameInvite } from "../redux/store";

const Navigation = () => {
  const token =
    useSelector((state: any) => state.auth.token) ??
    sessionStorage.getItem("token");

  const sockContext = useContext(SocketContext);
  const dispatch = useDispatch();

  const saveNewGameInvite = (senderId: number) => {
    dispatch(addGameInvite(senderId));
  };

  const handleNewGameInvite = (senderId: number) => {
    console.log("new game invite received", senderId);
    saveNewGameInvite(senderId);
  };

  const launchGame = (senderId: number, receiverId: number) => {
    console.log("launch game");
  };

  useEffect(() => {
    sockContext.socketUsers.on("newGameInvite", (senderId) =>
      handleNewGameInvite(senderId)
    );
    sockContext.socketUsers.on("acceptedGameInvite", (senderId, receiverId) =>
      launchGame(senderId, receiverId)
    );
    return () => {
      sockContext.socketUsers.off("newGameInvite", (senderId) =>
        handleNewGameInvite(senderId)
      );
      sockContext.socketUsers.off("acceptedGameInvite", (senderId, receiverId) =>
      launchGame(senderId, receiverId)
    );
    };
  }, []);

  return (
    <Routes>
      {menuLinks.map((link) => (
        <Route
          key={link.path}
          path={link.path}
          element={token ? <link.component /> : <Connection />}
        ></Route>
      ))}
    </Routes>
  );
};

export default Navigation;
