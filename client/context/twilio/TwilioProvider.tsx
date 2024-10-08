import {
  FC,
  useReducer,
  ReactNode,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { TwilioContext, twilioReducer } from "./";
import { TwilioService } from "@/services";
import { Call, Device } from "@twilio/voice-sdk";
import useWebSocketConnectionHook, { WebsocketEventEnum } from "@/webhook";
import { UiContext } from "@/context/ui";
import { ICall, IMessage, IRecording } from "@/interfaces";
import { injectMessage } from "@/utils/functions";
import { UserContext } from "@/context/user";

export interface State {
  initial: boolean;
  inbound: boolean;
  call: Call | null;
  newMessage: IMessage | null;
  event: string;
  connect: boolean;
  outgoing: boolean;
  inProgress: boolean;
  number: string;
  inbounds: ICall[];
  calls: ICall[];
  messages: IMessage[];
  filteredCalls: ICall[];
  preFilteredCalls: ICall[];
  voicemails: IRecording[];
  recordings: IRecording[];
  filteredRecordings: IRecording[];
  preFilteredRecordings: IRecording[];
  filteredMessages: IMessage[];
  preFilteredMessages: IMessage[];
}

interface Props {
  children?: ReactNode;
}

const INITIAL_STATE: State = {
  initial: true,
  inbound: false,
  call: null,
  newMessage: null,
  event: "",
  connect: false,
  outgoing: false,
  inProgress: false,
  number: "",
  inbounds: [],
  calls: [],
  messages: [],
  filteredCalls: [],
  preFilteredCalls: [],
  voicemails: [],
  recordings: [],
  filteredRecordings: [],
  preFilteredRecordings: [],
  filteredMessages: [],
  preFilteredMessages: [],
};

export const TwilioProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(twilioReducer, INITIAL_STATE);
  const { tabs, setTabs, setSelected } = useContext(UiContext);
  const { updateUserStatus } = useContext(UserContext);

  useWebSocketConnectionHook((event: any) => {
    if (event.CallStatus) {
      setEvent(event.CallStatus);
      updateUserStatus("online");
    }
    if (event.SmsStatus === "received") {
      tabs[7].notification = {
        display: true,
        open: false,
        number: tabs[7].notification?.number + 1,
      };
      setTabs(tabs);

      const incomingMessage = {
        to: event.To,
        from: event.From,
        body: event.Body,
        dateCreated: new Date().toISOString(),
        sid: event.SmsSid,
        unread: true,
      };
      injectMessage(
        incomingMessage,
        state.messages,
        state.filteredMessages,
        state.preFilteredMessages
      );
      setMessage(state.messages[0]);
    }
    if (
      event.MessageStatus === "failed" ||
      event.MessageStatus === "undelivered"
    ) {
      setMessage({
        ...state.newMessage,
        errorMessage: "error",
      });
    }
  }, WebsocketEventEnum.EVENT);

  const setInitialState = useCallback(async () => {
    updateUserStatus("online");
    setInbound(false);
    setConnect(false);
    setOutgoing(false);
    setInprogress(false);
    setEvent("");
    setNumber("");
    setCall(null);
  }, [updateUserStatus]);

  const accept = async () => {
    updateUserStatus("oncall");
    state.call?.accept();
    setInbound(false);
    setConnect(true);
    setInprogress(true);
  };

  const reject = () => {
    state.call?.reject();
  };

  const handleInboundCall = useCallback(
    (call: Call) => {
      if (!state.outgoing) {
        setSelected(0);
        setInbound(true);
        setNumber(call.parameters.From);
        call.on("cancel", () => {
          setInitialState();
        });
        call.on("disconnect", () => {
          setInitialState();
        });
        call.on("reject", () => {
          setInitialState();
        });
      }
    },
    [state.outgoing, setSelected, setInitialState]
  );

  const addDeviceListeners = useCallback(
    async (device: Device) => {
      device.on("error", function (error: any) {
        console.log(error);
        console.log("Device Error: " + error.message);
        window.location.reload();
      });
      device.on("incoming", async (call: Call) => {
        setCall(call);
        handleInboundCall(call);
      });
    },
    [handleInboundCall]
  );

  const intitializeDevice = useCallback(async () => {
    const response: any = await TwilioService.intitializeDevice();
    const device = new Device(response.token);
    if (device?.state === "unregistered") {
      addDeviceListeners(device);
      device.register();
    }
  }, [addDeviceListeners]);

  const createCall = useCallback(
    async (number: string) => {
      setNumber(number);
      setEvent("");
      setOutgoing(true);
      const response: any = await TwilioService.intitializeDevice();
      const device = new Device(response.token);
      if (device) {
        const call = await device.connect({
          params: {
            To: number,
          },
        });
        setCall(call);
        setConnect(true);
        updateUserStatus("oncall");
        call.on("cancel", () => {
          setInitialState();
        });
        call.on("disconnect", () => {
          setInitialState();
        });
        call.on("reject", () => {
          setInitialState();
        });
      } else {
        console.log("Unable to make call...");
      }
    },
    [setInitialState, updateUserStatus]
  );

  const disconnectCall = () => {
    updateUserStatus("online");
    state.call?.disconnect();
  };

  const setConnect = (payload: boolean) => {
    dispatch({ type: "SET_CONNECT", payload: payload });
  };

  const setNumber = (payload: string) => {
    dispatch({ type: "SET_NUMBER", payload: payload });
  };

  const setEvent = (event: string) => {
    dispatch({ type: "SET_EVENT", payload: event });
  };

  const setCall = (call: Call | null) => {
    dispatch({ type: "SET_CALL", payload: call });
  };

  const setMessage = useCallback((message: IMessage | null) => {
    dispatch({ type: "SET_MESSAGE", payload: message });
  }, []);

  const setOutgoing = (inbound: boolean) => {
    dispatch({ type: "SET_OUTGOING", payload: inbound });
  };

  const setInprogress = (inProgress: boolean) => {
    dispatch({ type: "SET_IN_PROGRESS", payload: inProgress });
  };

  const setInbound = (inbound: boolean) => {
    dispatch({ type: "SET_INBOUND", payload: inbound });
  };

  const setInitial = (initial: boolean) => {
    dispatch({ type: "SET_INITIAL", payload: initial });
  };

  const setFilteredCalls = useCallback((calls: ICall[]) => {
    dispatch({ type: "SET_FILTERED_CALLS", payload: calls });
  }, []);

  const getInboundCalls = useCallback(
    async (
      pageNumber: number,
      search: boolean,
      sid: string,
      id: string,
      role: string
    ): Promise<ICall[] | []> => {
      const response = await TwilioService.getInboundCalls(
        pageNumber,
        search,
        sid,
        id,
        role
      );
      dispatch({ type: "SET_FILTERED_CALLS", payload: response });
      dispatch({ type: "SET_INBOUND_CALLS", payload: response });
      return response;
    },
    []
  );

  const getCalls = useCallback(
    async (
      pageNumber: number,
      search: boolean,
      sid: string,
      id: string,
      role: string
    ): Promise<ICall[] | []> => {
      const response = await TwilioService.getCalls(
        pageNumber,
        search,
        sid,
        id,
        role
      );
      dispatch({ type: "SET_FILTERED_CALLS", payload: response });
      dispatch({ type: "SET_CALLS", payload: response });
      return response;
    },
    []
  );

  const setFilteredRecordings = useCallback((recordings: IRecording[]) => {
    dispatch({ type: "SET_FILTERED_RECORDINGS", payload: recordings });
  }, []);

  const getRecordings = useCallback(
    async (
      source: string,
      pageNumber: number,
      search: boolean,
      sid: string,
      id: string,
      role: string
    ): Promise<IRecording[] | []> => {
      const response = await TwilioService.getRecordings(
        source,
        pageNumber,
        search,
        sid,
        id,
        role
      );
      dispatch({ type: "SET_FILTERED_RECORDINGS", payload: response });
      if (source === "RecordVerb") {
        dispatch({ type: "SET_VOICEMAILS", payload: response });
      } else {
        dispatch({ type: "SET_RECORDINGS", payload: response });
      }
      return response;
    },
    []
  );

  const getAudioRecord = useCallback(async (recording: IRecording) => {
    const response = await TwilioService.getAudioRecord(recording);
    return response;
  }, []);

  const setFilteredMessages = useCallback((messages: IMessage[]) => {
    dispatch({ type: "SET_FILTERED_MESSAGES", payload: messages });
  }, []);

  const getMessages = useCallback(
    async (pageNumber: number, search: boolean): Promise<IMessage[] | []> => {
      const response = await TwilioService.getMessages(pageNumber, search);
      dispatch({ type: "SET_FILTERED_MESSAGES", payload: response });
      dispatch({ type: "SET_MESSAGES", payload: response });
      return response;
    },
    []
  );

  const createMessage = useCallback(
    async (to: string, body: string): Promise<IMessage | {}> => {
      const response = await TwilioService.outboundMessage(to, body);
      dispatch({ type: "SET_MESSAGE", payload: response });
      return response;
    },
    []
  );

  useEffect(() => {
    switch (state.event) {
      case "in-progress":
        setInprogress(true);
        break;
    }
  }, [state.event]);

  return (
    <TwilioContext.Provider
      value={{
        ...state,
        setInbound,
        setCall,
        setMessage,
        setInprogress,
        setEvent,
        setConnect,
        setOutgoing,
        setNumber,
        intitializeDevice,
        createCall,
        disconnectCall,
        accept,
        reject,
        setFilteredCalls,
        getInboundCalls,
        getCalls,
        setInitial,
        setFilteredRecordings,
        setFilteredMessages,
        getRecordings,
        getAudioRecord,
        getMessages,
        createMessage,
      }}
    >
      {children}
    </TwilioContext.Provider>
  );
};
