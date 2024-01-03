import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "../utils/API";
import { loginSuccess } from "../redux/store";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

const TextInput = styled.input`
  border-width: 2px;
  width: 50%;
  padding: 5px;
  border-radius: 20px;
  padding-left: 10px;
  margin: 3%;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100px;
  justify-content: space-between;
  width: 200px;
`;

const ButtonStyle = styled.div`
  display: flex;
  padding: 5px;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  font-size: 20px;
  border: 1px solid black;
  cursor: pointer;
`;

type Props = {
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  setExistingUser: (bol: boolean) => void;
  setSubmit: (bol: boolean) => void;
  wrongSubmit: boolean;
  setWrongSubmit: (bol: boolean) => void;
};

const Login = ({
  email,
  setEmail,
  password,
  setPassword,
  setExistingUser,
  setSubmit,
  wrongSubmit,
  setWrongSubmit,
}: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const connectionTry = async () => {
    console.log("YOOOOOO", email, password)
    if (!email.length || !password.length) return;
    await api
      .post("auth/connect", { email, password })
      .then((res) => {
        if (!res.data.returnCode) {
          dispatch(loginSuccess(res.data.token));
          setSubmit(true);
          navigate("/home");
        } else setWrongSubmit(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <LoginContainer>
      <p>{"Log In"}</p>
      <TextInput
        type="text"
        autoCapitalize="none"
        autoComplete="off"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value.trim())}
      />
      <TextInput
        type={showPassword ? "text" : "password"}
        autoCapitalize="none"
        autoComplete="off"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <ButtonsContainer>
        <ButtonStyle onClick={() => setShowPassword(!showPassword)}>
          <p>
            {showPassword ? "Cacher le mot de passe" : "Voir le mot de passe"}
          </p>
        </ButtonStyle>
        <ButtonStyle onClick={connectionTry}>{"Se connecter"}</ButtonStyle>
        <p>
          {wrongSubmit &&
            "L'email/pseudo et/ou le mot de passe ne correspondent à aucun utilisateur"}
        </p>
        <ButtonStyle onClick={() => setSubmit(true)}>{"Invité"}</ButtonStyle>
        <ButtonStyle onClick={() => setExistingUser(false)}>
          {"Créer mon compte"}
        </ButtonStyle>
      </ButtonsContainer>
    </LoginContainer>
  );
};

export default Login;
