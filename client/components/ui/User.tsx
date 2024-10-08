import { FC } from "react";
import {
  EllipsisVerticalIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { DropDownMenu } from "./DropDownMenu";
import { capitalize } from "@/utils/strings";
import { IUser } from "@/interfaces";

interface Props {
  user: IUser;
  action: any;
}

export const User: FC<Props> = ({ user, action }) => {
  const list = ["Inbounds", "History", "Records", "Profile"];

  const ListIndex = (index: number) => {
    action(index, user?.sid);
  };

  return (
    <>
      <div key={user?.id} className="group flex gap-x-3 p-2 hover:bg-gray-50">
        <div className="ml-3 flex h-11 w-11 flex-none items-center justify-center rounded-full bg-gray-50 group-hover:bg-white">
          {user.role === "supervisor" ? (
            <UserGroupIcon
              aria-hidden="true"
              className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
            />
          ) : (
            <UserIcon
              aria-hidden="true"
              className="h-5 w-5 text-gray-600 group-hover:text-indigo-600"
            />
          )}
        </div>
        <div className="w-44">
          <div className="font-semibold text-gray-900">
            {capitalize(user?.name || "") +
              " " +
              capitalize(user?.lastname || "")}
          </div>
          <div className="mt-1 flex text-xs">
            <p className="text-gray-600 mr-1 font-bold">Phone: </p>
            <p className="text-gray-600 mr-4">{user?.phone || ""}</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <span
            className={`h-3 w-3 rounded-full ring-2 ring-white ${
              user.status === "online"
                ? "bg-green-400"
                : user.status === "offline"
                ? "bg-red-500"
                : "bg-orange-400"
            }`}
          ></span>
          <p className="text-gray-600 ml-2 font-semibold">{user.status}</p>
        </div>
        <div className="flex items-center justify-center mr-4">
          <DropDownMenu list={list} divider={2} selectedItem={ListIndex}>
            <EllipsisVerticalIcon
              aria-hidden="true"
              className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
            />
          </DropDownMenu>
        </div>
      </div>
    </>
  );
};
