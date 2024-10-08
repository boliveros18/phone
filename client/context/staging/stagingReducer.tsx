import { State } from "./";

type Action =
  | "SET_CONTACTS"
  | "SET_FILTERED_CONTACTS"
type ActionType = { type: Action; payload?: any };

export const stagingReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "SET_FILTERED_CONTACTS":
      return { ...state, filteredContacts: action.payload };
    case "SET_CONTACTS":
      return { ...state, contacts: action.payload };
    default:
      return state;
  }
};
