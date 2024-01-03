import styled from "styled-components";

const ChatMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 95%;
`;

const ChatTabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid black;
  cursor: pointer;
  margin: 10px;
`;

const ChatTab = styled.div<{ selected: boolean }>`
  display: flex;
  flex: 1;
  border: none;
  background-color: ${({ selected }) => (selected ? "green" : "grey")};
  color: white;
  padding: 5px;
  font-size: 20px;
  cursor: pointer;
  border: 1px solid black;
`;

const ChannelListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
`;

const ChannelContainer = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid black;
  cursor: pointer;
  margin: 10px;
  width: 90%;
  border-radius: 5px;
  padding: 5px;
`;

const PseudoWrapper = styled.div`
  display: flex;
  margin: 10px;
`;

const LastMessageWrapper = styled.div`
  display: flex;
  margin: 10px;
  color: grey;
`;

export {
  ChatMenuContainer,
  ChatTabsContainer,
  ChatTab,
  ChannelListContainer,
  ChannelContainer,
  LastMessageWrapper,
  PseudoWrapper,
};
