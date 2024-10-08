import { FC } from "react";
import { IUser } from "@/interfaces";

interface Props {
  user: IUser | undefined;
}

export const Profile: FC<Props> = ({ user }) => {
  return (
    <>
      <div className="flex flex-col items-center pt-8">
        <div>
          <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full bg-black mb-2">
            <span className="font-semibold text-2xl text-white text-center">
              {(user?.name?.substring(0, 1).toUpperCase() || "") +
                (user?.lastname?.substring(0, 1).toUpperCase() || "")}
            </span>
          </div>
        </div>
        <div className="font-medium text-lg text-gray-900 mb-2">
          {user?.name + " " + user?.lastname}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="block font-medium my-2 mx-4 py-1 px-4">
          <div>Phone</div>
          <div className="h-6 font-light">{user?.phone}</div>
          <div>Fax</div>
          <div className="h-6 font-light">{user?.fax}</div>
          <div>Email</div>
          <div className="h-6 font-light">{user?.email}</div>
        </div>
      </div>
    </>
  );
};
