import { FC, useContext } from "react";
import { Inter } from "next/font/google";
import { PhoneIcon } from "@heroicons/react/24/solid";
import { TwilioContext } from "@/context/twilio";
import { IconButton } from "./IconButton";

const inter = Inter({
  subsets: ["latin"],
});

interface Props {
  number: string;
}

export const InboundCall: FC<Props> = ({ number }) => {
  const { accept, reject } = useContext(TwilioContext);

  return (
    <div className="h-558 bg-gray-50">
      <div className={`${inter.className}`}>
        <div className="text-3xl text-center text-black h-9 pt-11">
          {number}
        </div>
      </div>
      <div className="h-96"></div>
      <div className="grid grid-cols-2 mt-2">
        <div className="flex flex-col items-center">
          <IconButton
            background={`${inter.className} bg-green-500 hover:bg-green-400`}
            onClick={() => accept()}
            Icon={PhoneIcon}
          />
          <div className="mt-1">accept</div>
        </div>
        <div className="flex flex-col items-center">
          <IconButton
            background={`${inter.className} bg-red-500 hover:bg-red-400`}
            onClick={() => reject()}
            Icon={PhoneIcon}
            transform="transform rotate-135"
          />
          <div className="mt-1">cancel</div>
        </div>
      </div>
    </div>
  );
};
