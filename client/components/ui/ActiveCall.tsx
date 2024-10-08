import { FC, useEffect, useState } from "react";
import { Inter } from "next/font/google";
import {
  PhoneIcon,
  PauseIcon,
  SpeakerXMarkIcon,
  UserPlusIcon,
  Squares2X2Icon,
  PhoneArrowUpRightIcon,
} from "@heroicons/react/24/solid";

const inter = Inter({
  subsets: ["latin"],
});

interface Props {
  inProgress: boolean;
  number: string;
  disconnect: any;
}

export const ActiveCall: FC<Props> = ({ inProgress, number, disconnect }) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const calling = [
    { name: "Hold", icon: PauseIcon },
    { name: "Mute", icon: SpeakerXMarkIcon },
    { name: "Add", icon: UserPlusIcon },
    { name: "Keypad", icon: Squares2X2Icon },
    { name: "End", icon: PhoneIcon },
    { name: "Transfer", icon: PhoneArrowUpRightIcon },
  ];

  useEffect(() => {
    if (inProgress) {
      const interval = setInterval(() => {
        setSeconds((pre: number) => {
          if (pre === 59) {
            setMinutes(minutes + 1);
            return 0;
          }
          return pre + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [minutes, inProgress]);

  return (
      <div className="h-558 flex flex-col items-center text-sm">
         <div className="h-6"></div>
        <div className={`${inter.className}`}>
          <div className="font-normal text-xl text-center text-gray-400">
            {inProgress
              ? `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
                  2,
                  "0"
                )}`
              : "calling"}
          </div>
          <div className="text-3xl text-center h-9">{number}</div>
        </div>
        <div className="h-60"></div>
        <div className="grid grid-cols-3 gap-6 mt-2">
          {calling.map((item, index) => (
            <div key={item.name} className="flex flex-col items-center">
              <button
                type="button"
                className={`flex items-center justify-center w-16 h-16 font-normal text-3xl rounded-full ${
                  inter.className
                } ${
                  index === 4
                    ? "bg-red-500 hover:bg-red-400"
                    : "bg-gray-200 hover:bg-gray-100 invisible"
                }`}
                onClick={() => {
                  if (item.name === "End") {
                    disconnect();
                  }
                }}
              >
                <item.icon
                  className={` text-white ${
                    index === 4 ? "transform rotate-135 h-7 w-7" : " h-7 w-7"
                  }`}
                  title={item.name}
                />
              </button>
              <div className="mt-1 invisible">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
  );
};
