import { State } from ".";

type Action =
  | "SET_CONNECT"
  | "SET_INBOUND"
  | "SET_NUMBER"
  | "SET_EVENT"
  | "SET_CALL"
  | "SET_MESSAGE"
  | "SET_OUTGOING"
  | "SET_IN_PROGRESS"
  | "SET_CALLS"
  | "SET_MESSAGES"
  | "SET_INBOUND_CALLS"
  | "SET_INITIAL"
  | "SET_FILTERED_CALLS"
  | "SET_PRE_FILTERED_CALLS"
  | "SET_VOICEMAILS"
  | "SET_RECORDINGS"
  | "SET_FILTERED_RECORDINGS"
  | "SET_PRE_FILTERED_RECORDINGS"
  | "SET_FILTERED_MESSAGES"
  | "SET_PRE_FILTERED_MESSAGES";
type ActionType = { type: Action; payload?: any };

export const twilioReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "SET_CONNECT":
      return { ...state, connect: action.payload };
    case "SET_INBOUND":
      return { ...state, inbound: action.payload };
    case "SET_NUMBER":
      return { ...state, number: action.payload };
    case "SET_EVENT":
      return { ...state, event: action.payload };
    case "SET_CALL":
      return { ...state, call: action.payload };
    case "SET_MESSAGE":
      return { ...state, newMessage: action.payload };
    case "SET_OUTGOING":
      return { ...state, outgoing: action.payload };
    case "SET_IN_PROGRESS":
      return { ...state, inProgress: action.payload };
    case "SET_CALLS":
      return { ...state, calls: action.payload };
    case "SET_MESSAGES":
      return { ...state, messages: action.payload };
    case "SET_INBOUND_CALLS":
      return { ...state, inbounds: action.payload };
    case "SET_INITIAL":
      return { ...state, initial: action.payload };
    case "SET_FILTERED_CALLS":
      return { ...state, filteredCalls: action.payload };
    case "SET_PRE_FILTERED_CALLS":
      return { ...state, preFilteredCalls: action.payload };
    case "SET_VOICEMAILS":
      return { ...state, voicemails: action.payload };
    case "SET_RECORDINGS":
      return { ...state, recordings: action.payload };
    case "SET_FILTERED_RECORDINGS":
      return { ...state, filteredRecordings: action.payload };
    case "SET_PRE_FILTERED_RECORDINGS":
      return { ...state, preFilteredRecordings: action.payload };
    case "SET_FILTERED_MESSAGES":
      return { ...state, filteredMessages: action.payload };
    case "SET_PRE_FILTERED_MESSAGES":
      return { ...state, preFilteredMessages: action.payload };
    default:
      return state;
  }
};
