import { ApiStaging } from "../apis";

const handleError = (error: any, operation: string) => {
  console.error(
    `${operation} failed`,
    error.response ? error.response.data : error.message
  );
  throw error;
};

export const fetchContactInfo = async (
  token: string
) => {
  try {
      const response = await ApiStaging.get("/api/Contacts/directory", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
    return response.data.data
  } catch (error) {
    handleError(error, "Error fetching contact info");
    throw new Error("Invalid fetching");
  }
};
