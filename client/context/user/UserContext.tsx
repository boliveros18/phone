import { IUser } from "@/interfaces";
import { createContext } from "react";

interface ContextProps {
  user: IUser | null;
  users: IUser[];
  filteredUsers: IUser[];
  getUserById: (id: string) => Promise<IUser | {}>;
  createUser: (payload: IUser) => Promise<IUser | {}>;
  updateUserStatus: (status: string) => void;
  getUsers: () => Promise<IUser[] | []>;
  setFilteredUsers: (users: IUser[]) => void;
}

export const UserContext = createContext({} as ContextProps);
