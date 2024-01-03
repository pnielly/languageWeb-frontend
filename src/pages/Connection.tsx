import { useEffect, useState } from "react";
import styled from "styled-components";
import Login from "../components/Login";
import Signup from "../components/Signup";

const ConnectionContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Connection = () => {
  const [email, setEmail] = useState<string>("user1@example.com");
  const [pseudo, setPseudo] = useState<string>("");
  const [password, setPassword] = useState<string>("password1");
  const [existingUser, setExistingUser] = useState<boolean>(true);
  const [submit, setSubmit] = useState<boolean>(false);
  const [wrongSubmit, setWrongSubmit] = useState<boolean>(false);

  useEffect(() => {
    setSubmit(false);
    setWrongSubmit(false);
  }, []);

  useEffect(() => {
    if (submit) {
      existingUser ? login() : signup();
    }
  }, [existingUser, submit]);

  const login = () => {
    setWrongSubmit(false);
  };
  const signup = () => {
    setWrongSubmit(false);
  };

  return (
    <ConnectionContainer>
      {existingUser ? (
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          setExistingUser={setExistingUser}
          setSubmit={setSubmit}
          wrongSubmit={wrongSubmit}
          setWrongSubmit={setWrongSubmit}
        />
      ) : (
        <Signup
          email={email}
          setEmail={setEmail}
          pseudo={pseudo}
          setPseudo={setPseudo}
          password={password}
          setPassword={setPassword}
          setExistingUser={setExistingUser}
          setSubmit={setSubmit}
          wrongSubmit={wrongSubmit}
          setWrongSubmit={setWrongSubmit}
        />
      )}
    </ConnectionContainer>
  );
};

export default Connection;
