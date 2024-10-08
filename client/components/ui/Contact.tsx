import { FC } from "react";
import { IContact } from "@/interfaces";

interface Props {
  contact: IContact;
  action: any;
}

export const Contact: FC<Props> = ({ contact, action }) => {

  return (
    <>
      <div
        key={contact.name}
        className="group flex gap-x-3 p-2 hover:bg-gray-50 cursor-pointer border-b"
        onClick={action}
      >
        <div className="w-48">
          <a className="font-normal text-gray-900 pl-4">
            {contact.name}
            <span className=" inset-0" />
          </a>
        </div>
      </div>
    </>
  );
};
