import { IUser } from "@/interfaces";
import { ApiServer } from "../apis";
import { getSession } from "next-auth/react";

const httpOptions = {
  headers: {
    "Content-Type": "application/json",
  },
};

const handleError = (error: any, operation: string) => {
  console.error(`${operation} failed`, error);
  throw error;
};

export const createUser = async (payload: IUser) => {
  try {
    const response = await ApiServer.post(
      "/users/register",
      payload,
      httpOptions
    );
    return response.data;
  } catch (error) {
    handleError(error, "register");
    console.error("Error adding user:", error);
    return {};
  }
};

export const updateUserStatus = async (status: string) => {
  try {
    const session = await getSession();
    const user: any = session?.user;
    const response = await ApiServer.put(
      `/users/${user.id}`,
      { status: status },
      httpOptions
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export const getUserById = async (id: string): Promise<IUser | {}> => {
  try {
    const response = await ApiServer.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, "getUserById");
    return {};
  }
};

export const getUsers = async (): Promise<IUser[] | []> => {
  try {
    const response = await ApiServer.get(`/users/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
