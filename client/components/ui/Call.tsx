import { FC, useContext } from "react";
import { ArrowUpRightIcon, ArrowDownLeftIcon } from "@heroicons/react/24/solid";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { ICall, IUser } from "@/interfaces";
import { TwilioContext } from "@/context/twilio";
import { UiContext } from "@/context/ui";
import { UserContext } from "@/context/user";

interface Props {
  call: ICall;
  user: IUser;
}

export const Call: FC<Props> = ({ call, user }) => {
  const { createCall } = useContext(TwilioContext);
  const { setSelected, setTypeMessage, setInboxMessageToogle, setTo } =
    useContext(UiContext);
  const { users } = useContext(UserContext);

  const inbound =
    call.to?.includes("client") ||
    call.toFormatted === user.id ||
    call.toFormatted === process.env.NEXT_PUBLIC_PHONE_FORMATTED_NUMBER;

  const userFrom = users.find((user) => user.sid === call.fromFormatted);
  const userTo = users.find((user) => user.sid === call.toFormatted);
  const fromFormatted = userFrom
    ? userFrom.name + " " + userFrom.lastname
    : call.fromFormatted;
  const toFormatted = userTo
    ? userTo?.name + " " + userTo.lastname
    : call.toFormatted;

  const to = call?.from?.includes("client") ? call.to : call.from;

  return (
    <>
      <div key={call?.sid} className="flex gap-x-3 p-2 hover:bg-gray-50">
        <div className="ml-2 flex h-11 w-11 flex-none items-center justify-center rounded-full bg-white">
          {inbound ? (
            <ArrowDownLeftIcon
              aria-hidden="true"
              className="h-5 w-5 text-red-500"
            />
          ) : (
            <ArrowUpRightIcon
              aria-hidden="true"
              className="h-5 w-5 text-green-500"
            />
          )}
        </div>
        <div
          className="w-40  cursor-pointer"
          onClick={() => {
            setSelected(0);
            createCall(to || "");
          }}
        >
          <div className={"font-semibold text-gray-600 h-5"}>
            {call.fromFormatted === user.id
              ? user.name + " " + user.lastname
              : fromFormatted}
          </div>
          <div className={"flex text-xs text-gray-600 h5"}>
            <p className="mr-1 font-medium">To: </p>
            <p className="mr-4">
              {call.toFormatted === user.id
                ? user.name + " " + user.lastname
                : toFormatted}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="text-gray-600 ml-2 font-normal text-xs">
            {call.dateCreated?.substring(0, 10)}
          </div>
          <div className="text-gray-600 ml-2 font-normal text-xs">
            {call.dateCreated?.substring(11, 19)}
          </div>
        </div>
        <div
          className="h-7 w-7 m-1 mt-2 flex items-center justify-center rounded-md hover:bg-gray-100"
          onClick={() => {
            setSelected(6);
            setInboxMessageToogle(true);
            setTypeMessage("new");
            setTo(to || "");
          }}
        >
          <ChatBubbleLeftEllipsisIcon
            aria-hidden="true"
            className="h-5 w-5 text-gray-600 hover:text-blue-600 mx-1 cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};
