import { FC, useReducer, ReactNode, useCallback } from "react";
import { StagingContext, stagingReducer } from "./";
import { IContact, IUser } from "@/interfaces";
import { ContactService } from "@/services";
import { userInitials } from "../../utils/strings";

export interface State {
  account: IUser;
  contacts: IContact[];
  filteredContacts: IContact[];
}

interface Props {
  children?: ReactNode;
}

const INITIAL_STATE: State = {
  account: userInitials,
  contacts: [],
  filteredContacts: [],
};

export const StagingProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(stagingReducer, INITIAL_STATE);

  const setFilteredContacts = useCallback((contacts: IContact[]) => {
    dispatch({ type: "SET_FILTERED_CONTACTS", payload: contacts });
  }, []);

  const getContacts = useCallback(
    async (
      token: string,
      pageNumber: number,
      pageSize: number,
      filter?: string
    ) => {
      const response = await ContactService.fetchContactInfo(
        token,
        pageNumber,
        pageSize,
        filter
      );
      dispatch({ type: "SET_FILTERED_CONTACTS", payload: response });
      dispatch({ type: "SET_CONTACTS", payload: response });
      return response;
    },
    []
  );

  return (
    <StagingContext.Provider
      value={{
        ...state,
        setFilteredContacts,
        getContacts,
      }}
    >
      {children}
    </StagingContext.Provider>
  );
};
