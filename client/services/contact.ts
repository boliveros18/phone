import { IContact } from "@/interfaces";
import { ApiStaging } from "../apis";

const handleError = (error: any, operation: string) => {
  console.error(
    `${operation} failed`,
    error.response ? error.response.data : error.message
  );
  throw error;
};

export const fetchContactInfo = async (
  token: string,
  pageNumber: number,
  pageSize: number,
  filter?: string
) => {
  const props: any = {
    FirstName: [],
    MiddleName: [],
    LastName: [],
    Email: [],
    Phone: [],
  };
  try {
    const queries = Object.keys(props).map(async (prop) => {
      const response = await ApiStaging.get("/api/Contacts/directory", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          [prop]: filter,
          pageNumber,
          pageSize,
        },
      });
      props[prop] = response.data.data.map((item: any) => ({
        id: item.id,
        ...item,
      })) as IContact[];
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
    handleError(error, "Error fetching contact info");
    throw new Error("Invalid fetching");
  }
};
