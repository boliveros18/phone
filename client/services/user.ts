import { IUser } from "@/interfaces";
import { db } from "../firestoreConfig";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
  limit,
  startAfter,
  orderBy,
} from "firebase/firestore";
import { getSession } from "next-auth/react";

export const createUser = async (payload: IUser) => {
  try {
    const querySnapshot = await addDoc(collection(db, "users"), payload);
    const user = { id: querySnapshot.id, ...payload };
    return user;
  } catch (error) {
    console.error("Error adding user:", error);
    return {};
  }
};

export const updateUser = async (id: string, payload: IUser) => {
  try {
    await setDoc(doc(collection(db, "users"), id), payload);
    return await getUserById(id);
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export const updateUserStatus = async (status: string) => {
  try {
    const session = await getSession();
    const user: any = session?.user;
    const { id } = (await getUserSession(user.id)) as any;
    await setDoc(doc(db, "users", id), { status }, { merge: true });
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    await deleteDoc(doc(collection(db, "users"), id));
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

export const getUserById = async (id: string): Promise<IUser | {}> => {
  try {
    const querySnapshot = await getDoc(doc(collection(db, "users"), id));
    const user = {
      id: querySnapshot.id,
      ...querySnapshot.data(),
    };
    return user;
  } catch (error) {
    console.error("Error fetching user id:", error);
    return {};
  }
};

export const getUserSession = async (id: string) => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("sid", "==", id))
    );
    if (querySnapshot.empty) {
      return {};
    }
    const doc = querySnapshot.docs[0];
    const user = {
      id: doc.id,
      ...doc.data(),
    };
    return user;
  } catch (error) {
    console.error("Error fetching user session:", error);
    return {};
  }
};

export const getUsers = async (): Promise<IUser[] | []> => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("role", "!=", "super"))
    );
    const users = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        sid: data.sid,
        name: data.name,
        lastname: data.lastname,
        phone: data.phone,
        fax: data.fax,
        email: data.email,
        role: data.role,
        status: data.status,
        token: "",
      } as IUser;
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const getUsersByFilter = async (filter: string) => {
  const props: any = {
    name: [],
    lastname: [],
    phone: [],
    fax: [],
    email: [],
    role: [],
    status: [],
  };
  try {
    const queries = Object.keys(props).map(async (prop) => {
      const querySnapshot = await getDocs(
        query(
          collection(db, "users"),
          where(prop, ">=", filter),
          where(prop, "<=", filter + "\uf8ff"),
          limit(6)
        )
      );
      props[prop] = querySnapshot.docs
        .filter((doc) => doc.data().role !== "super")
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as IUser[];
    });
    await Promise.all(queries);
    let max = 0;
    let maxResultsProp = "";
    for (const key in props) {
      if (Array.isArray(props[key])) {
        const length = props[key].length;
        if (length > max) {
          max = length;
          maxResultsProp = key;
        }
      }
    }
    return props[maxResultsProp] || [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const getPaginateUsers = async (
  pageNumber: number,
  lastUsername?: string
): Promise<IUser[] | []> => {
  try {
    if (pageNumber === 1) {
      const querySnapshot = await getDocs(
        query(collection(db, "users"), orderBy("name"), limit(6))
      );
      const users = querySnapshot.docs
        .filter((doc) => doc.data().role !== "super")
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as IUser[];
      return users;
    } else {
      const lastUserDoc = (
        await getDocs(
          query(
            collection(db, "users"),
            where("name", "==", lastUsername),
            limit(1)
          )
        )
      ).docs[0];
      const querySnapshot = await getDocs(
        query(
          collection(db, "users"),
          orderBy("name"),
          startAfter(lastUserDoc),
          limit(6)
        )
      );
      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as IUser[];
      return users;
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
