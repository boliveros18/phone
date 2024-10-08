import { FC } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";

interface Props {
  message: any;
  action: any;
}

export const Message: FC<Props> = ({ message, action }) => {
  return (
    <>
      <div
        key={message.sid}
        className={`p-2 hover:bg-gray-50  cursor-pointer ${
          message.unread ? "bg-indigo-50" : ""
        }`}
        onClick={action}
      >
        <div className="flex gap-x-3">
          <div className="ml-2 flex h-11 w-11 flex-none items-center justify-center rounded-full bg-white">
            <UserCircleIcon aria-hidden="true" className="h-7 w-7" />
          </div>
          <div>
            <div className="flex">
              <div className="font-semibold text-gray-600 h-5 w-40">
                {message.from === process.env.NEXT_PUBLIC_PHONE_NUMBER
                  ? message.to
                  : message.from}
              </div>
              <div className="text-gray-600 font-normal text-xs mt-1">
                {message.dateCreated.substring(0, 10) +
                  " " +
                  message.dateCreated.substring(11, 19)}
              </div>
            </div>
            <div className=" items-center justify-start mt-1">
              <div className="text-xs text-gray-600 h-5">
                <p className="mr-4">
                  {message.errorMessage
                    ? "Error sending message"
                    : message.body.substring(0, 50)  +
                      (message.body.length >= 50 ? "..." : "")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
