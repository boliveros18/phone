import { FC, useContext } from "react";
import { IContact } from "@/interfaces";
import { BackContainer } from "./BackContainer";
import {
  ChatBubbleLeftEllipsisIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { TwilioContext } from "@/context/twilio";
import { UiContext } from "@/context/ui";
import { getSession } from "next-auth/react";

interface Props {
  contact: IContact | undefined;
  backClick?: any;
  back?: boolean;
}

export const Card: FC<Props> = ({ contact, back, backClick }) => {
  const { createCall } = useContext(TwilioContext);
  const { setSelected, setTypeMessage, setInboxMessageToogle, setTo } =
    useContext(UiContext);

  const actions = [
    { name: "call", icon: PhoneIcon },
    { name: "message", icon: ChatBubbleLeftEllipsisIcon },
  ];

  return (
    <BackContainer back={back} backClick={backClick}>
      <div key={contact?.contactId} className="flex flex-col items-center pt-4">
        <div>
          <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full bg-black mb-2">
            <span className="font-semibold text-2xl text-white text-center">
              {contact?.name.substring(0, 1)}
            </span>
          </div>
        </div>
        <div className="font-medium text-lg text-gray-900 mb-2">
          {contact?.name}
        </div>
        <div className="flex">
          {actions.map((item) => (
            <div
              key={item.name}
              onClick={async () => {
                const session = await getSession();
                const user: any = session?.user;
                if (item.name === "call") {
                  setSelected(0);
                  createCall(
                    "+1" + contact?.phone?.toString().replace(/-/g, "") || ""
                  );
                } else {
                  if (contact?.phone) {
                    if (user.role === "super") {
                      setSelected(7);
                    } else {
                      setSelected(6);
                    }
                    setInboxMessageToogle(true);
                    setTypeMessage("new");
                    setTo(contact?.phone);
                  }
                }
              }}
            >
              <div className="flex flex-col h-16 w-20 mx-2 flex-none items-center justify-center rounded-lg text-black hover:bg-gray-50 cursor-pointer">
                <item.icon aria-hidden="true" className="h-6 w-6" />
                <div className="block font-medium">{item.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="block rounded-md font-medium border border-gray-100 my-2 mx-4 py-1 px-4">
          <div>Phone</div>
          <div className="h-6 font-light">{contact?.phone}</div>
          <div>Email</div>
          <div className="h-6 font-light">{contact?.email}</div>
        </div>
      </div>
    </BackContainer>
  );
};
