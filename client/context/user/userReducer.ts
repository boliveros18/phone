import { State } from ".";

type Action = "SET_USER" | "SET_USERS" | "SET_FILTERED_USERS";
type ActionType = { type: Action; payload?: any };

export const userReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "SET_FILTERED_USERS":
      return { ...state, filteredUsers: action.payload };
    default:
      return state;
  }
};
