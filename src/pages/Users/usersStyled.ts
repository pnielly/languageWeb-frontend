import styled from "styled-components";

const UserPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 95%;
`;

const TitleContainer = styled.h2`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  max-height: 300px;
`;

const UserLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
  height: 50px;
  margin: 5px;
  border-radius: 10px;
  padding: 10px;
`;

const Pseudo = styled.div`
  font-size: 20px;
`;

const InteractionButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const InteractionButton = styled.div`
  border: none;
  background-color: green;
  color: white;
  border-radius: 10px;
  padding: 5px;
  font-size: 20px;
  height: 30px;
  width: auto;
  margin: 5px;
  cursor: pointer;
`;

export {
  UserPageContainer,
  TitleContainer,
  UserList,
  UserLine,
  Pseudo,
  InteractionButtonsWrapper,
  InteractionButton,
};
