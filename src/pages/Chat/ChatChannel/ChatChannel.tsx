import React, { useState, KeyboardEvent, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatServices from "../../../services/chat.services";
import { Message } from "../../../interfaces/interfaces";
import { SocketContext } from "../../../contexts/sockets";
import useCurrentUser from "../../../hooks/currentUser";
import { ChatMenuContainer, GoBackWrapper, Header, MessageBoxInput, MessageBoxWrapper, MessageList, MessageWrapper, Pseudo, SendButton } from "./chatChannelStyles";

const ChatChannel = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const { otherUserId } = useParams();
  const navigate = useNavigate();
  const sockContext = useContext(SocketContext);
  const me = useCurrentUser();

  const setMessagesAsRead = () => {
    if (!otherUserId) return;
    ChatServices.setMessagesAsRead(otherUserId).catch((err) => {
      console.log("Error while setting messages as read", err);
    });
  };

  const updateMessages = () => {
    if (!otherUserId) return;
    ChatServices.getConversation(otherUserId)
      .then((res) => {
        setMessages(res.data);
        setMessagesAsRead();
      })
      .catch((err) => {
        console.log("Error while retrieving conversation", err);
      });
  };

  useEffect(() => {
    if (otherUserId) {
      updateMessages();
      setMessagesAsRead();
    }
  }, [otherUserId]);

  useEffect(() => {
    sockContext.socketUsers.on("updateMessageList", updateMessages);
    return () => {
      sockContext.socketUsers.off("updateMessageList", updateMessages);
    };
  }, []);

  const sendMessage = () => {
    if (!input.length) return;
    sockContext.socketUsers.emit("sendMessage", {
      text: input,
      senderId: me.id,
      receiverId: Number(otherUserId),
    });
    setInput("");
  };

  const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const handleGoBack = () => {
    navigate("/chat");
  };

  return (
    <ChatMenuContainer>
      <Header>
        <GoBackWrapper onClick={handleGoBack}>{"<-"}</GoBackWrapper>
        <Pseudo>PSEUDO</Pseudo>
      </Header>
      <MessageList>
        {messages.map((message, index) => (
          <MessageWrapper
            currentuser={me.id === message.senderId ? "true" : "false"}
            key={index}
          >
            {message.text}
          </MessageWrapper>
        ))}
      </MessageList>
      <MessageBoxWrapper>
        <MessageBoxInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={handlePressEnter}
        />
        <SendButton onClick={sendMessage}>Envoyer</SendButton>
      </MessageBoxWrapper>
    </ChatMenuContainer>
  );
};

export default ChatChannel;
