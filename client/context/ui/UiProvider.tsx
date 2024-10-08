import { FC, useReducer, ReactNode, useCallback } from "react";
import { UiContext, uiReducer } from ".";
import { tabs } from "@/utils/strings";

export interface State {
  to: string | number;
  sid: string;
  search: boolean;
  height: number;
  rows: number;
  minimize: boolean;
  selected: number;
  isLoading: boolean;
  tabs: any;
  typeMessage: string;
  inboxMessageToogle: boolean;
}

interface Props {
  children?: ReactNode;
}

const INITIAL_STATE: State = {
  to: "",
  sid: "",
  search: false,
  height: 352,
  rows: 1,
  minimize: false,
  selected: 0,
  isLoading: true,
  tabs: tabs,
  typeMessage: "",
  inboxMessageToogle: false,
};

export const UiProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, INITIAL_STATE);

  const setTo = (payload: string | number) => {
    dispatch({ type: "SET_TO", payload: payload });
  };

  const setSid = (payload: string | number) => {
    dispatch({ type: "SET_SID", payload: payload });
  };

  const setSearch = (payload: boolean) => {
    dispatch({ type: "SET_SEARCH", payload: payload });
  };

  const setMinimize = (payload: boolean) => {
    dispatch({ type: "SET_MINIMIZE", payload: payload });
  };

  const setSelected = (payload: number) => {
    dispatch({ type: "SET_SELECTED", payload: payload });
  };

  const setHeight = (payload: number) => {
    dispatch({ type: "SET_HEIGHT", payload: payload });
  };

  const setRows = (payload: number) => {
    dispatch({ type: "SET_ROWS", payload: payload });
  };

  const setIsLoading = useCallback((isLoading: boolean) => {
    dispatch({ type: "SET_IS_LOADING", payload: isLoading });
  }, []);

  const setTabs = useCallback((tabs: any) => {
    dispatch({ type: "SET_TABS", payload: tabs });
  }, []);

  const setTypeMessage = (payload: string) => {
    dispatch({ type: "SET_TYPE_MESSAGE", payload: payload });
  };

  const setInboxMessageToogle = (payload: boolean) => {
    dispatch({ type: "SET_INBOX_MESSAGE_TOOGLE", payload: payload });
  };

  return (
    <UiContext.Provider
      value={{
        ...state,
        setTo,
        setSid,
        setSearch,
        setMinimize,
        setSelected,
        setHeight,
        setRows,
        setIsLoading,
        setTabs,
        setTypeMessage,
        setInboxMessageToogle,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
