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

export const userInitials = {
  id: "",
  token: "",
  name: "",
  lastname: "",
  phone: "",
  fax: "",
  email: "",
  role: "",
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
  }
];
