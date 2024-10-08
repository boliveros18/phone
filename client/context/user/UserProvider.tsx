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

  const getUserById = useCallback(async (id: string) => {
    const data = await UserService.getUserById(id);
    return data;
  }, []);

  const getUserSession = useCallback(async (id: string) => {
    const data: any = await UserService.getUserSession(id);
    dispatch({ type: "SET_USER", payload: {...data, id: data.sid} });
    return data;
  }, []);

  const createUser = useCallback(async (payload: IUser) => {
    const data = await UserService.createUser(payload);
    return data;
  }, []);

  const updateUser = useCallback(async (id: string, payload: IUser) => {
    await UserService.updateUser(id, payload);
  }, []);

  const updateUserStatus = useCallback(async (status: string, id?: string) => {
    await UserService.updateUserStatus(status);
  }, []);

  const deleteUser = useCallback(async (id: string) => {
    await UserService.deleteUser(id);
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

  const getUsersByFilter = useCallback(async (filter: string) => {
    const data = await UserService.getUsersByFilter(filter);
    dispatch({ type: "SET_FILTERED_USERS", payload: data });
    return data;
  }, []);

  const getPaginateUsers = useCallback(
    async (pageNumber: number, lastUsername?: string) => {
      const data = await UserService.getPaginateUsers(pageNumber, lastUsername);
      dispatch({ type: "SET_USERS", payload: data });
      return data;
    },
    []
  );

  return (
    <UserContext.Provider
      value={{
        ...state,
        getUserById,
        getUserSession,
        createUser,
        updateUser,
        deleteUser,
        getUsers,
        updateUserStatus,
        setFilteredUsers,
        getUsersByFilter,
        getPaginateUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
