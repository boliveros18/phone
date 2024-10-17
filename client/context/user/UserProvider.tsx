import { FC, useReducer, ReactNode, useCallback } from "react";
import { UserContext, userReducer } from ".";
import { IUser } from "../../interfaces";
import { UserService } from "@/services";

export interface State {
  user: IUser | null;
  users: IUser[];
  filteredUsers: IUser[];
}

interface Props {
  children?: ReactNode;
}

const INITIAL_STATE: State = {
  user: null,
  users: [],
  filteredUsers: [],
};

export const UserProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const createUser = useCallback(async (payload: IUser) => {
    const data = await UserService.createUser(payload);
    return data;
  }, []);

  const updateUserStatus = useCallback(async (status: string) => {
    await UserService.updateUserStatus(status);
  }, []);

  const getUserById = useCallback(async (id: string) => {
    const data = await UserService.getUserById(id);
    return data;
  }, []);

  const getUsers = useCallback(async () => {
    const data = await UserService.getUsers();
    dispatch({ type: "SET_USERS", payload: data });
    dispatch({ type: "SET_FILTERED_USERS", payload: data });
    return data;
  }, []);

  const setFilteredUsers = useCallback((users: IUser[]) => {
    dispatch({ type: "SET_FILTERED_USERS", payload: users });
  }, []);

  return (
    <UserContext.Provider
      value={{
        ...state,
        createUser,
        updateUserStatus,
        getUserById,
        getUsers,
        setFilteredUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
