import { IContact } from "@/interfaces";
import { createContext } from "react";

interface ContextProps {
  contacts: IContact[];
  paginates: IContact[];
  filteredContacts: IContact[];
  setPaginates: (contacts: IContact[]) => void;
  setFilteredContacts: (contacts: IContact[]) => void;
  getContacts: (
    token: string
  ) => Promise<IContact[] | []>;
}

export const StagingContext = createContext({} as ContextProps);
