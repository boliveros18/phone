import { createContext } from "react";

interface ContextProps {
  to: string | number;
  sid: string;
  search: boolean;
  height: number;
  rows: number;
  minimize: boolean;
  selected: number;
  typeMessage: string;
  isLoading: boolean;
  tabs: any;
  inboxMessageToogle: boolean;
  setTo: (payload: string | number) => void;
  setSid: (payload: string) => void;
  setSearch: (payload: boolean) => void;
  setHeight: (payload: number) => void;
  setRows: (payload: number) => void;
  setMinimize: (payload: boolean) => void;
  setSelected: (payload: number) => void;
  setTypeMessage: (payload: string) => void;
  setIsLoading: (payload: boolean) => void;
  setTabs: (payload: {}) => void;
  setInboxMessageToogle: (payload: boolean) => void;
}

export const UiContext = createContext({} as ContextProps);
