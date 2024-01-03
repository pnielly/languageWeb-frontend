import React, {
  ChangeEvent,
  KeyboardEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import useCurrentUser from "../../hooks/currentUser";
import { SocketContext } from "../../contexts/sockets";
import {
  HomeContainer,
  SceneContainer,
  SceneListContainer,
  SearchBar,
  SearchBarContainer,
} from "./homeStyles";
import { addGameInvite } from "../../redux/store";
import { useDispatch } from "react-redux";

const Home = () => {
  const placeholder = "Rechercher un film, un genre...";
  const [search, setSearch] = useState("");
  const sockContext = useContext(SocketContext);
  const me = useCurrentUser();

  useEffect(() => {
    if (me && me.id) {
      sockContext.socketUsers.emit("online", { userId: me.id });
    }
  }, [me, sockContext]);

  const sceneList = [
    {
      name: "Scene 1",
      id: "/scene1",
      genre: "Action",
    },
    {
      name: "Scene 2",
      id: "/scene2",
      genre: "Comédie",
    },
    {
      name: "Scene 3",
      id: "/scene3",
      genre: "Comédie",
    },
    {
      name: "Scene 3",
      id: "/scene4",
      genre: "Comédie",
    },
    {
      name: "Scene 4",
      id: "/scene5",
      genre: "Comédie",
    },
  ];

  const handleTyping = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("Start search for:", search);
    }
  };

  return (
    <HomeContainer>
      <SearchBarContainer>
        <SearchBar
          type="text"
          placeholder={placeholder}
          onChange={handleTyping}
          onKeyUp={handlePressEnter}
        />
      </SearchBarContainer>
      <SceneListContainer>
        {sceneList.map((scene) => {
          return (
            <SceneContainer key={scene.id}>
              <h1>{scene.name}</h1>
              <h2>{scene.genre}</h2>
            </SceneContainer>
          );
        })}
      </SceneListContainer>
    </HomeContainer>
  );
};

export default Home;
