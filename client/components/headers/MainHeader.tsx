import { FC } from "react";
import { IUser } from "@/interfaces";

interface Props {
  user: IUser;
}

export const MainHeader: FC<Props> = ({ user }) => {
  return (
    <>
      <div className="relative mt-1 ml-2 flex items-center gap-x-2 mb-1">
        <div className="relative inline-block">
          <div className="flex h-12 w-12 flex-col items-center justify-center rounded-full bg-black mt-2 ml-1 mr-1">
            <span className="font-semibold text-xl text-white text-center">
              {user.name.substring(0, 1).toUpperCase() + user.lastname.substring(0, 1).toUpperCase()}
            </span>
          </div>
        </div>
        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900">
            <span className="absolute inset-0" />
            {user.name + " " + user.lastname}
          </p>
          <div className="mt-1 flex text-xs">
            <p className="text-gray-600 mr-1 font-bold">Voice: </p>
            <p className="text-gray-600 mr-4">{user.phone}</p>
            <p className="text-gray-600 mr-1 font-bold">Fax: </p>
            <p className="text-gray-600 ">{user.fax}</p>
          </div>
        </div>
      </div>
    </>
  );
};
