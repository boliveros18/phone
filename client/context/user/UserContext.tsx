import { IUser } from "@/interfaces";
import { createContext } from "react";

interface ContextProps {
  user: IUser | null;
  users: IUser[];
  filteredUsers: IUser[];
  getUserById: (id: string) => Promise<IUser | {}>;
  getUserSession: (id: string) => Promise<IUser | {}>;
  createUser: (payload: IUser) => Promise<IUser | {}>;
  updateUser: (id: string, payload: IUser) => void;
  deleteUser: (id: string) => void;
  getUsers: () => Promise<IUser[] | []>;
  updateUserStatus: (status: string) => void;
  setFilteredUsers: (users: IUser[]) => void;
  getUsersByFilter: (filter: string) => Promise<IUser[] | []>;
  getPaginateUsers: (
    pageNumber: number,
    lastUsername?: string
  ) => Promise<IUser[] | []>;
}

export const UserContext = createContext({} as ContextProps);
