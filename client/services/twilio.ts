import { ICall, IMessage, IRecording } from "@/interfaces";
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

export const intitializeDevice = async () => {
  try {
    const session = await getSession();
    const user: any = session?.user;
    const response = await ApiServer.get(
      `/twilio/init/${user.id}`,
      httpOptions
    );
    return response.data;
  } catch (error) {
    handleError(error, "intitializeDevice");
    return {};
  }
};

export const getInboundCalls = async (
  pageNumber: number,
  search: boolean,
  sid: string,
  id: string,
  role: string
): Promise<ICall[] | []> => {
  try {
    const response = await ApiServer.post(
      `/twilio/inbounds/`,
      {
        pageNumber: pageNumber,
        search: search,
        sid: sid,
        id: id,
        role: role,
      },
      httpOptions
    );
    return response.data;
  } catch (error) {
    handleError(error, "getInboundCalls");
    return [];
  }
};

export const getCalls = async (
  pageNumber: number,
  search: boolean,
  sid: string,
  id: string,
  role: string
): Promise<ICall[] | []> => {
  try {
    const response = await ApiServer.post(
      `/twilio/calls/`,
      {
        pageNumber: pageNumber,
        search: search,
        sid: sid,
        id: id,
        role: role,
      },
      httpOptions
    );
    return response.data;
  } catch (error) {
    handleError(error, "getCalls");
    return [];
  }
};

export const getRecordings = async (
  source: string,
  pageNumber: number,
  search: boolean,
  sid: string,
  id: string,
  role: string
): Promise<IRecording[] | []> => {
  try {
    const response = await ApiServer.post(
      `/twilio/recordings/`,
      {
        source: source,
        pageNumber: pageNumber,
        search: search,
        sid: sid,
        id: id,
        role: role,
      },
      httpOptions
    );
    return response.data;
  } catch (error) {
    handleError(error, "getRecordings");
    return [];
  }
};

export const getAudioRecord = async (
  recording: IRecording
): Promise<Blob | {}> => {
  try {
    const response = await ApiServer.post(`/twilio/record`, recording, {
      ...httpOptions,
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    handleError(error, "getAudioRecord");
    return {};
  }
};

export const getMessages = async (
  pageNumber: number,
  search: boolean
): Promise<IMessage[] | []> => {
  try {
    const response = await ApiServer.post(
      `/twilio/messages/`,
      { pageNumber: pageNumber, search: search },
      httpOptions
    );
    return response.data;
  } catch (error) {
    handleError(error, "getMessages");
    return [];
  }
};

export const outboundMessage = async (
  to: string,
  body: string
): Promise<IMessage | {}> => {
  try {
    const response = await ApiServer.post(
      `/twilio/message-out/`,
      { to: to, body: body },
      httpOptions
    );
    return response.data;
  } catch (error) {
    handleError(error, "outboundMessage");
    return {};
  }
};

export const updateOfflineStatus = async (id: string) => {
  try {
    await ApiServer.post(
      `/twilio/update/`,
      {
        id: id,
        status: "offline",
      },
      httpOptions
    );
  } catch (error) {
    handleError(error, "Error updating offline status");
  }
};
