import { FC } from "react";
import { IMessage } from "@/interfaces";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

interface Props {
  message: IMessage;
  from: string;
}

export const BodyMessage: FC<Props> = ({ message, from }) => {
  return (
    <>
      <div className="text-center mb-1 text-xs">
        {message?.dateCreated?.substring(0, 10) +
          ", " +
          message?.dateCreated?.substring(11, 19)}
      </div>
      <div>
        <div
          className={`${
            message?.errorMessage ? "" : " mb-4"
          }  w-auto p-2 rounded-lg ${
            message?.from === from
              ? "ml-4 mr-12 bg-blue-50"
              : "ml-12 mr-4 bg-green-100"
          }`}
        >
          {message?.body}
        </div>
        {message?.errorMessage && (
          <div className="flex justify-end text-red-600">
            <ExclamationCircleIcon className="h-4 w-4 mr-1 mt-1" />
            <span className="mr-5">No delivered</span>
          </div>
        )}
      </div>
    </>
  );
};
