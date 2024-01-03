import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChannelContainer,
  ChannelListContainer,
  ChatMenuContainer,
  ChatTab,
  ChatTabsContainer,
  LastMessageWrapper,
  PseudoWrapper,
} from "./chatMenuStyles";
import { ChatChannel } from "../../../interfaces/interfaces";
import ChatServices from "../../../services/chat.services";

const ChatMenu = () => {
  const [activeTab, setActiveTab] = useState<string>("friends");
  const navigate = useNavigate();
  const location = useLocation();
  const [channels, setChannels] = useState<ChatChannel[]>([]);

  useEffect(() => {
    ChatServices.getChannels()
      .then((res) => {
        setChannels(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const ChatTabs = () => (
    <ChatTabsContainer>
      <ChatTab
        selected={activeTab === "friends"}
        onClick={() => setActiveTab("friends")}
      >
        Friends
      </ChatTab>
      <ChatTab
        selected={activeTab === "nonFriends"}
        onClick={() => setActiveTab("nonFriends")}
      >
        Non-Friends
      </ChatTab>
    </ChatTabsContainer>
  );

  const ChannelItem = ({ channel }: { channel: ChatChannel }) => (
    <ChannelContainer
      onClick={() => {
        navigate(`${channel.userId}`);
      }}
    >
      <PseudoWrapper>{channel.pseudo}</PseudoWrapper>
      <LastMessageWrapper>
        {channel.lastMessage.length
          ? channel.lastMessage
          : `Dîtes bonjour à ${channel.pseudo} !`}
      </LastMessageWrapper>
    </ChannelContainer>
  );

  const ChannelList = () => (
    <div>
      <h2>
        Chat Channels with {activeTab === "friends" ? "Friends" : "Non-Friends"}
      </h2>
      <ChannelListContainer>
        {channels.map((channel) => {
          if (activeTab === "friends" && channel.isFriend) {
            return <ChannelItem key={channel.userId} channel={channel} />;
          }
          if (activeTab === "nonFriends" && !channel.isFriend) {
            return <ChannelItem key={channel.userId} channel={channel} />;
          }
          return null;
        })}
      </ChannelListContainer>
    </div>
  );

  return (
    <ChatMenuContainer>
      <ChatTabs />
      {channels.length ? (
        <ChannelList />
      ) : (
        "Vous n'avez pas de conversation en cours."
      )}
    </ChatMenuContainer>
  );
};

export default ChatMenu;
