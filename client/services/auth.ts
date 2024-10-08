import { ApiServer } from "../apis";

const httpOptions = {
  headers: {
    "Content-Type": "application/json",
  },
};

const handleError = (error: any, operation: string) => {
  console.error(
    `${operation} failed`,
    error.response ? error.response.data : error.message
  );
  throw error;
};

export const authenticateUser = async (
  id: string,
  token: string,
  name: string,
  lastname: string,
  phone: string,
  fax: string,
  email: string,
  role: string
) => {
  try {
    const response = await ApiServer.post(
      "/twilio/login",
      {
        id: id,
        token: token,
        name: name,
        lastname: lastname,
        phone: phone,
        fax: fax,
        email: email,
        role: role,
      },
      httpOptions
    );
    return response.data;
  } catch (error: any) {
    handleError(error, "checking user id");
    throw new Error("Invalid user id");
  }
};
