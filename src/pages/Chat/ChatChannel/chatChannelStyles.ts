import styled from "styled-components";

const ChatMenuContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 95%;
  height: 95%;
  border: 1px solid red;
`;

const Header = styled.div`
  height: 10%;
  width: 100%;
  background: grey;
  margin-bottom: 3%;
  display: flex;
  flex-direction: row;
  justify-text: center;
  align-items: center;
`;

const GoBackWrapper = styled.div`
  height: 40px;
  width: 40px;
  background: red;
  margin: 1%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Pseudo = styled.p``;

const MessageList = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin: 15px;
  margin-bottom: 30px;
  overflow-y: scroll;
  border: 1px solid black;
  width: 95%;
`;

const MessageWrapper = styled.div<{ currentuser: string }>`
  display: flex;
  max-width: 50%;
  border: black solid 1px;
  min-height: 30px;
  justify-content: center;
  padding: 10px;
  border-radius: 20px;
  margin-top: 5px;
  ${({ currentuser }) =>
    currentuser === "false" ? "margin-left: auto;" : "margin-right: auto;"}
`;

const MessageBoxWrapper = styled.div`
  display: flex;
  height: 40px;
  margin: 15px;
  position: relative;
`;

const MessageBoxInput = styled.input`
  width: 90%;
  height: 40px;
  border: green solid 2px;
  border-radius: 10px;
  padding-left: 15px;
  margin-right: 10px;
`;

const SendButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: blue;
  border-radius: 10px;
  padding: 5px;
  cursor: pointer;
`;

export {
  ChatMenuContainer,
  Header,
  GoBackWrapper,
  Pseudo,
  MessageList,
  MessageWrapper,
  MessageBoxWrapper,
  MessageBoxInput,
  SendButton,
};
