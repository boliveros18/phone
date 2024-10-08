import { IUser } from "@/interfaces";
import {
  Squares2X2Icon,
  PhoneArrowDownLeftIcon,
  InboxIcon,
  ChatBubbleLeftEllipsisIcon,
  ArrowPathRoundedSquareIcon,
  StopCircleIcon,
  UsersIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";

export const capitalize = (words: string) => {
  if (words)
    return words.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
      letter.toUpperCase()
    );
};

export const numbers: (string | number)[] = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  "*",
  0,
  "#",
];

export const footer: string[] = [
  "\u00A0",
  "ABC",
  "DEF",
  "GHI",
  "JKL",
  "MNO",
  "PQRS",
  "TUV",
  "WXYZ",
  "\u00A0",
  "+",
  "\u00A0",
];

export const convertToUserObject = (params: string): IUser => {
  const object = {
    id: "",
    sid: "",
    token: "",
    name: "",
    lastname: "",
    phone: "",
    fax: "",
    email: "",
    role: "",
  };
  const pairs = params.split(",");

  pairs.forEach((pair) => {
    const [key, value] = pair.split(":").map((item) => item.trim());

    if (key in object) {
      (object as IUser)[key as keyof IUser] = value;
    }
  });

  return object as IUser;
};

export const userInitials = {
  id: "dbsd6yhrdbndj5j",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidGVsZXBob255IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoidGVsZXBob255QGRscy1pbnMuY29tIiwianRpIjoiODAxMGI1NTctZTc0MC00NGVmLThjN2UtYzdiYzVmN2FlZGIxIiwiY29udGFjdElkIjoiZjlkMjZlZmQtNGJkYi00ODJjLWE0OGUtOWJlMTQ3ODhlOGUyIiwiT1JHIjoiRExTIiwiY2xhaW1zIjoidmlldy5Db250YWN0UGhvbmUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZ2VudCIsImV4cCI6MTcyODM0OTI4OCwiaXNzIjoiRGxzSWRlbnRpdHlBcGkiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDM0NCJ9.XTCrJ7MfIg8d8fo56Z7oXS5K9xtQTBnGB2paLcpwjw8",
  name: "fgdsfgsdfg",
  lastname: "sdfgdsg",
  phone: "_",
  fax: "_",
  email: "_",
  role: "_",
};

export const tabs = [
  {
    name: "Dialing",
    notification: {
      display: false,
      open: false,
      number: 0,
    },
    icon: Squares2X2Icon,
  },
  {
    name: "Users",
    notification: {
      display: false,
      open: false,
      number: 0,
    },
    icon: KeyIcon,
  },
  {
    name: "Contacts",
    notification: {
      display: false,
      open: false,
      number: 0,
    },
    icon: UsersIcon,
  },
  {
    name: "InboundCall",
    notification: {
      display: false,
      open: false,
      number: 4,
    },
    icon: PhoneArrowDownLeftIcon,
  },
  {
    name: "VoiceMails",
    notification: {
      display: false,
      open: false,
      number: 1,
    },
    icon: InboxIcon,
  },
  {
    name: "Records",
    notification: {
      display: false,
      open: false,
      number: 0,
    },
    icon: StopCircleIcon,
  },
  {
    name: "History",
    notification: {
      display: false,
      open: false,
      number: 0,
    },
    icon: ArrowPathRoundedSquareIcon,
  },
  {
    name: "Messages",
    notification: {
      display: false,
      open: true,
      number: 0,
    },
    icon: ChatBubbleLeftEllipsisIcon,
  },
  /*
  {
    name: "Faxing",
    notification: {
      display: true,
      open: false,
      number: 1,
    },
    icon: DocumentArrowUpIcon,
  },
  */
];
