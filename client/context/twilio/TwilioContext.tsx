import { ICall, IMessage, IRecording, IUser } from "@/interfaces";
import { Call, Device } from "@twilio/voice-sdk";
import { createContext } from "react";

interface ContextProps {
  initial: boolean;
  event: string;
  connect: boolean;
  number: string;
  inbound: boolean;
  outgoing: boolean;
  inProgress: boolean;
  call: Call | null;
  newMessage: IMessage | null;
  inbounds: ICall[];
  calls: ICall[];
  filteredCalls: ICall[];
  preFilteredCalls: ICall[];
  voicemails: IRecording[];
  recordings: IRecording[];
  filteredRecordings: IRecording[];
  preFilteredRecordings: IRecording[];
  messages: IMessage[];
  filteredMessages: IMessage[];
  preFilteredMessages: IMessage[];
  intitializeDevice: () => void;
  setInitial: (initial: boolean) => void;
  setEvent: (event: string) => void;
  setConnect: (payload: boolean) => void;
  setNumber: (payload: string) => void;
  setInbound: (inbound: boolean) => void;
  setOutgoing: (payload: boolean) => void;
  setInprogress: (inProgress: boolean) => void;
  setCall: (call: Call | null) => void;
  setMessage: (message: IMessage | null) => void;
  setFilteredCalls: (calls: ICall[]) => void;
  setFilteredRecordings: (recordings: IRecording[]) => void;
  setFilteredMessages: (messages: IMessage[]) => void;
  getInboundCalls: (
    pageNumber: number,
    search: boolean,
    sid: string,
    id: string, 
    role: string
  ) => Promise<ICall[] | []>;
  getCalls: (
    pageNumber: number,
    search: boolean,
    sid: string,
    id: string, 
    role: string
  ) => Promise<ICall[] | []>;
  getRecordings: (
    source: string,
    pageNumber: number,
    search: boolean,
    sid: string,
    id: string, 
    role: string
  ) => Promise<IRecording[] | []>;
  getAudioRecord: (recording: IRecording) => Promise<Blob | {}>;
  getMessages: (
    pageNumber: number,
    search: boolean
  ) => Promise<IMessage[] | []>;
  createMessage: (to: string, body: string) => Promise<IMessage | {}>;
  createCall: (number: string) => void;
  disconnectCall: () => void;
  accept: () => void;
  reject: () => void;
}

export const TwilioContext = createContext({} as ContextProps);
