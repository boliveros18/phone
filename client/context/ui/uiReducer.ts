import { State } from ".";

type Action =
  | "SET_TO"
  | "SET_SID"
  | "SET_SEARCH"
  | "SET_MINIMIZE"
  | "SET_SELECTED"
  | "SET_HEIGHT"
  | "SET_ROWS"
  | "SET_IS_LOADING"
  | "SET_TABS"
  | "SET_TYPE_MESSAGE"
  | "SET_INBOX_MESSAGE_TOOGLE";
type ActionType = { type: Action; payload?: any };

export const uiReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "SET_TO":
      return { ...state, to: action.payload };
    case "SET_SID":
      return { ...state, sid: action.payload };
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_MINIMIZE":
      return { ...state, minimize: action.payload };
    case "SET_SELECTED":
      return { ...state, selected: action.payload };
    case "SET_HEIGHT":
      return { ...state, height: action.payload };
    case "SET_ROWS":
      return { ...state, rows: action.payload };
    case "SET_IS_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_TABS":
      return { ...state, tabs: action.payload };
    case "SET_TYPE_MESSAGE":
      return { ...state, typeMessage: action.payload };
    case "SET_INBOX_MESSAGE_TOOGLE":
      return { ...state, inboxMessageToogle: action.payload };
    default:
      return state;
  }
};
