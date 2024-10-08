import { IContact } from "@/interfaces";
import { createContext } from "react";

interface ContextProps {
  contacts: IContact[];
  filteredContacts: IContact[];
  setFilteredContacts: (calls: IContact[]) => void;
  getContacts: (
    token: string,
    pageNumber: number,
    pageSize: number,
    filter?: string
  ) => Promise<IContact[] | []>;
}

export const StagingContext = createContext({} as ContextProps);
