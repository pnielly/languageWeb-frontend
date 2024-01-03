import React, { useContext, useEffect, useState } from "react";
import { UserOverview } from "../../interfaces/interfaces";
import useCurrentUser from "../../hooks/currentUser";
import { SocketContext } from "../../contexts/sockets";
import UsersService from "../../services/users.services";
import {
  InteractionButton,
  InteractionButtonsWrapper,
  Pseudo,
  TitleContainer,
  UserLine,
  UserList,
  UserPageContainer,
} from "./usersStyled";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "../../redux/store";

const Users = () => {
  const [friends, setFriends] = useState<UserOverview[]>([]);
  const [requestingFriends, setRequestingFriends] = useState<UserOverview[]>(
    []
  );
  const [otherUsers, setOtherUsers] = useState<UserOverview[]>([]);
  const [sectionToDisplay, setSectionToDisplay] = useState<string>("");
  const [gameInvitationSent, setGameInvitationSent] = useState<number[]>([]);
  const location = useLocation();

  const sockContext = useContext(SocketContext);
  const me = useCurrentUser();
  const navigate = useNavigate();
  const [needToUpdateUsers, setNeedToUpdateUsers] = useState<boolean>(false);

  const senderIds = useSelector(
    (state: any) => store.getState().game.senderIds
  );

  const updateUsers = () => {
    setNeedToUpdateUsers(true);
  };

  useEffect(() => {
    sockContext.socketUsers.on("updateSentFriendRequests", updateUsers);
    sockContext.socketUsers.on("updateReceivedFriendRequests", updateUsers);
    sockContext.socketUsers.on("updateFriendships", updateUsers);
    sockContext.socketUsers.on("updateUsersStatus", updateUsers);
    return () => {
      sockContext.socketUsers.off("updateSentFriendRequests", updateUsers);
      sockContext.socketUsers.off("updateReceivedFriendRequests", updateUsers);
      sockContext.socketUsers.off("updateFriendships", updateUsers);
      sockContext.socketUsers.off("updateUsersStatus", updateUsers);
    };
  }, []);

  useEffect(() => {
    console.log("senderIds", senderIds);
  }, [store]);

  useEffect(() => {
    console.log("location", location.search);
    if (location.search === "?from=gameInvite") {
      setSectionToDisplay("friends");
    }
  }, [location]);

  const goToChat = (userId: number) => {
    navigate(`/chat/${userId}`);
  };

  const sendFriendRequest = (friendId: number) => {
    sockContext.socketUsers.emit("sentFriendRequest", {
      senderId: me.id,
      receiverId: friendId,
    });
  };

  const friendRequestResponse = (friendRequestId: number, accept: boolean) => {
    sockContext.socketUsers.emit("respondFriendRequest", {
      friendRequestId,
      accept,
    });
  };

  const sendGameInvitation = (friendId: number) => {
    sockContext.socketUsers.emit("sendGameInvite", {
      senderId: me.id,
      receiverId: friendId,
    });
    setGameInvitationSent([...gameInvitationSent, friendId]);
    setTimeout(() => {
      setGameInvitationSent([
        ...gameInvitationSent.filter((id) => id !== friendId),
      ]);
    }, 10000);
  };

  const gotInvitedToGame = (senderId: number) => {
    for (let id of senderIds) {
      if (Number(id) === senderId) {
        return true;
      }
    }
    return false;
  };

  const acceptGameInvitation = (senderId: number) => {
    sockContext.socketUsers.emit("acceptGameInvite", {
      senderId,
      receiverId: me.id,
    });
  }

  const FriendsList = () => (
    <>
      <TitleContainer
        onClick={() => {
          sectionToDisplay === "friends"
            ? setSectionToDisplay("")
            : setSectionToDisplay("friends");
        }}
      >
        Mes amis
      </TitleContainer>
      {sectionToDisplay === "friends" && (
        <UserList>
          {friends.map((user) => (
            <UserLine key={user.id}>
              <Pseudo>{user.pseudo}</Pseudo>
              <InteractionButtonsWrapper>
                <InteractionButton
                  onClick={() => {
                    if (gotInvitedToGame(user.id)) {
                      acceptGameInvitation(user.id);
                    } else {
                      sendGameInvitation(user.id);
                    }
                  }}
                >
                  {gameInvitationSent.includes(user.id)
                    ? "Demande envoyée"
                    : gotInvitedToGame(user.id)
                    ? "Accepter l'invitation"
                    : "Inviter à jouer"}
                </InteractionButton>

                <InteractionButton
                  onClick={() => {
                    goToChat(user.id);
                  }}
                >
                  Chat
                </InteractionButton>
              </InteractionButtonsWrapper>
            </UserLine>
          ))}
          {friends.length === 0 && <p>Vous n'avez pas encore d'ami.</p>}
        </UserList>
      )}
    </>
  );

  const RequestingFriendsList = () => (
    <>
      <TitleContainer
        onClick={() => {
          sectionToDisplay === "requests"
            ? setSectionToDisplay("")
            : setSectionToDisplay("requests");
        }}
      >
        Demandes d'ami
      </TitleContainer>
      {sectionToDisplay === "requests" && (
        <UserList>
          {requestingFriends.map((user) => (
            <UserLine key={user.id}>
              <Pseudo>{user.pseudo} sent you a friend request</Pseudo>
              <InteractionButtonsWrapper>
                <InteractionButton
                  onClick={() =>
                    friendRequestResponse(user.friendRequestId, true)
                  }
                >
                  Accepter l'invitation
                </InteractionButton>
                <InteractionButton
                  onClick={() =>
                    friendRequestResponse(user.friendRequestId, false)
                  }
                >
                  Décliner l'invitation
                </InteractionButton>
                <InteractionButton
                  onClick={() => {
                    goToChat(user.id);
                  }}
                >
                  Chat
                </InteractionButton>
              </InteractionButtonsWrapper>
            </UserLine>
          ))}
          {requestingFriends.length === 0 && (
            <p>Vous n'avez pas de demande d'ami.</p>
          )}
        </UserList>
      )}
    </>
  );

  const OtherUsers = () => (
    <>
      <TitleContainer
        onClick={() => {
          sectionToDisplay === "others"
            ? setSectionToDisplay("")
            : setSectionToDisplay("others");
        }}
      >
        Autres joueurs
      </TitleContainer>
      {sectionToDisplay === "others" && (
        <UserList>
          {otherUsers.map((user) => (
            <UserLine key={user.id}>
              <Pseudo>{user.pseudo}</Pseudo>
              <InteractionButtonsWrapper>
                <InteractionButton
                  onClick={() => {
                    if (user.sentFriendRequest) {
                      sendFriendRequest(user.id);
                    }
                  }}
                >
                  {user.sentFriendRequest
                    ? "Demande envoyée"
                    : "Envoyer une demande d'ami"}
                </InteractionButton>
                <InteractionButton
                  onClick={() => {
                    goToChat(user.id);
                  }}
                >
                  Chat
                </InteractionButton>
              </InteractionButtonsWrapper>
            </UserLine>
          ))}
          {otherUsers.length === 0 && (
            <p>
              Il semble que vous soyez le seul utilisateur pour le moment
              (chelou).
            </p>
          )}
        </UserList>
      )}
    </>
  );

  useEffect(() => {
    UsersService.getUserList()
      .then((res) => {
        const tmpFriends: UserOverview[] = [];
        const tmpRequestingFriends: UserOverview[] = [];
        const tmpOtherUsers: UserOverview[] = [];
        res.data.forEach((user: UserOverview) => {
          if (user.id === me.id) {
            return;
          }
          if (user.isFriend) {
            tmpFriends.push(user);
          } else if (user.friendRequestId) {
            tmpRequestingFriends.push(user);
          } else {
            tmpOtherUsers.push(user);
          }
        });
        setFriends(tmpFriends);
        setRequestingFriends(tmpRequestingFriends);
        setOtherUsers(tmpOtherUsers);
      })
      .catch((err) => {
        console.log("Error while retrieving Users: ", err);
      });
  }, [me.id, needToUpdateUsers]);

  return (
    <UserPageContainer>
      <h1>Users</h1>
      <FriendsList />
      <RequestingFriendsList />
      <OtherUsers />
    </UserPageContainer>
  );
};

export default Users;
