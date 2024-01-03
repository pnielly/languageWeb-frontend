import { combineReducers, configureStore } from "@reduxjs/toolkit";


const authInitialState = {
  token: null,
};

export const loginSuccess = (token: string) => {
  sessionStorage.setItem("token", token);
  return {
    type: "LOGIN_SUCCESS",
    payload: token,
  };
};

export const logout = () => {
  console.log("logout");
  return {
    type: "LOGOUT",
    payload: null,
  };
};

const authReducer = (
  state = authInitialState,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        token: "",
      };
    default:
      return state;
  }
};

const gameInitialState = {
  senderIds: [],
};

export const addGameInvite = (senderId: number) => {
  return {
    type: "ADD_GAME_INVITE",
    payload: senderId,
  };
};

export const removeGameInvite = (senderId: number) => {
  return {
    type: "REMOVE_GAME_INVITE",
    payload: senderId,
  };
};

const gameReducer = (
  state = gameInitialState,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case "ADD_GAME_INVITE":
      console.log("ADD_GAME_INVITE", action.payload)
      if (state.senderIds.includes(action.payload as never)) {
        return state;
      } else {
        return {
          ...state,
          senderIds: [...state.senderIds, action.payload],
        };
      }
    case "REMOVE_GAME_INVITE":
      return {
        ...state,
        senderIds: state.senderIds.filter(senderId => senderId !== action.payload),
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  game: gameReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
