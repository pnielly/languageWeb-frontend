import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "../utils/API";
import { loginSuccess } from "../redux/store";
import styled from "styled-components";

const SignupContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextInput = styled.input`
  border-width: 2px;
  width: 50%;
  padding: 5px;
  border-radius: 20px;
  padding-left: 10px;
  margin-vertical: 3%;
`;

const ButtonsContainer = styled.div`
  height: 200px;
  justify-content: space-between;
  width: 50%;
`;

const ButtonStyle = styled.div`
  border-radius: 20px;
  border: 1px solid black;
  cursor: pointer;
`;

type Props = {
  email: string;
  setEmail: (val: string) => void;
  pseudo: string;
  setPseudo: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  setExistingUser: (bol: boolean) => void;
  setSubmit: (bol: boolean) => void;
  wrongSubmit: boolean;
  setWrongSubmit: (bol: boolean) => void;
};

const Signup = ({
  email,
  setEmail,
  password,
  setPassword,
  pseudo,
  setPseudo,
  setExistingUser,
  setSubmit,
  setWrongSubmit,
  wrongSubmit,
}: Props) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const signUp = async () => {
    if (!email.length || !password.length) return;
    await api
      .post("users/create", { email, password, pseudo })
      .then((res) => {
        if (!res.data.returnCode) {
          dispatch(loginSuccess(res.data.token));
          setSubmit(true);
        } else setWrongSubmit(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <SignupContainer>
      <p>{"Sign Up"}</p>
      <TextInput
        type="text"
        autoCapitalize="none"
        autoComplete="off"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value.trim())}
      />
      <TextInput
        type="text"
        autoCapitalize="none"
        autoComplete="off"
        placeholder="Pseudo"
        value={pseudo}
        onChange={(e) => setPseudo(e.target.value.trim())}
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
          {showPassword ? "Cacher le mot de passe" : "Voir le mot de passe"}
        </ButtonStyle>
        <ButtonStyle onClick={signUp}>{"Créer un compte"}</ButtonStyle>
        <p>{wrongSubmit && "L'email existe déjà"}</p>
        {/* <ButtonStyle title="Invité" onClick={() => setSubmit(true)} /> */}
        <ButtonStyle onClick={() => setExistingUser(true)}>
          {"J'ai déjà un compte"}
        </ButtonStyle>
      </ButtonsContainer>
    </SignupContainer>
  );
};

export default Signup;
