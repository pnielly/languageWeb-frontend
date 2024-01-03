import styled from "styled-components";

const HomeContainer = styled.div`
  height: 95%;
  width: auto;
  border: 1px solid black;
`;

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px;
  width: auto;
  height: 10%;
`;

const SearchBar = styled.input`
  width: 50%;
  height: 40px;
  border-radius: 10px;
  padding-left: 10px;
`;

const SceneListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  width: auto;
  height: 80%;
  border: 5px solid black;
  overflow-y: scroll;
`;

const SceneContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  width: 90%;
  border: 1px solid black;
  cursor: pointer;
`;

export {
  HomeContainer,
  SearchBarContainer,
  SearchBar,
  SceneListContainer,
  SceneContainer,
};
