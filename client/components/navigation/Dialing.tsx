import { FC, useState, useRef, useEffect, useContext } from "react";
import { Inter } from "next/font/google";
import { PhoneIcon, BackspaceIcon, PlayIcon } from "@heroicons/react/24/solid";
import { ActiveCall } from "../ui/ActiveCall";
import { TwilioContext } from "@/context/twilio";
import { footer, numbers } from "@/utils/strings";
import { InboundCall } from "../ui/InboundCall";
import { IconButton } from "../ui/IconButton";
import { UserContext } from "@/context/user";

const inter = Inter({
  subsets: ["latin"],
});

interface Props {}

export const Dialing: FC<Props> = ({}) => {
  const { updateUserStatus } = useContext(UserContext);
  const {
    initial,
    connect,
    inbound,
    inProgress,
    number,
    setInitial,
    createCall,
    intitializeDevice,
    disconnectCall,
  } = useContext(TwilioContext);
  const [isMobile, setIsMobile] = useState(false);
  const [phone, setNumbers] = useState<(number | string)[]>([]);
  const cronometer = useRef(0);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const mobile = /android|iphone|ipad|iPod/i.test(userAgent);
    setIsMobile(mobile);
  }, []);

  const handleDialRelease = (item: number | string) => {
    if (new Date().getTime() - cronometer.current < 1000) {
      addNumber(item);
    } else if (item === 0) {
      addNumber("+");
    }
  };

  const addNumber = (newNumber: number | string) => {
    setNumbers((prevNumbers) => [...prevNumbers, newNumber]);
  };

  const delNumber = () => {
    setNumbers((prevNumbers) => prevNumbers.slice(0, -1));
  };

  const start = async () => {
    intitializeDevice();
    setInitial(false);
    updateUserStatus("online");
  };

  return (
    <>
      {initial ? (
        <div className="h-558 flex flex-col items-center justify-center ">
          <IconButton
            background={`${inter.className} bg-black hover:bg-gray-800`}
            onClick={() => start()}
            Icon={PlayIcon}
          />
          <div className="mt-1">Start device</div>
        </div>
      ) : inbound ? (
        <div className="">
          <InboundCall number={number} />
        </div>
      ) : (
        <>
          {connect ? (
            <ActiveCall
              number={number}
              disconnect={disconnectCall}
              inProgress={inProgress}
            />
          ) : (
            <div className="h-558 flex flex-col items-center justify-center text-sm">
              <div
                className={`pt-2 pb-10 font-light text-3xl ${inter.className} h-20`}
              >
                {phone.join("")}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {numbers.map((item, index) => (
                  <button
                    type="button"
                    key={item}
                    className={`flex items-center justify-center w-16 h-16 font-normal text-3xl rounded-full bg-gray-200 hover:bg-gray-100 ${inter.className}`}
                    onMouseDown={() => {
                      if (!isMobile) cronometer.current = new Date().getTime();
                    }}
                    onMouseUp={() => {
                      if (!isMobile) handleDialRelease(item);
                    }}
                    onTouchStart={() => {
                      if (isMobile) cronometer.current = new Date().getTime();
                    }}
                    onTouchEnd={() => {
                      if (isMobile) isMobile && handleDialRelease(item);
                    }}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <span>{item}</span>
                      <span className="text-xxs font-bold -m-4">
                        {footer[index]}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <button
                  type="button"
                  className={`flex items-center justify-center w-16 h-16 mt-5 font-normal text-3xl rounded-full bg-green-500 hover:bg-green-400`}
                  onClick={() => {
                    createCall(phone.join(""));
                  }}
                >
                  <PhoneIcon className="h-6 w-6 text-white " />
                </button>
                <button
                  type="button"
                  className={`absolute ml-20 pl-2 -m-12 ${
                    phone.length === 0 ? "hidden" : ""
                  }`}
                  onClick={() => delNumber()}
                >
                  <BackspaceIcon className="h-8 w-12 text-gray-200 hover:text-gray-100" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
