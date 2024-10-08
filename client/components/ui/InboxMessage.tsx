import { FC, useContext, ChangeEvent, useEffect, useRef } from "react";
import { BackContainer } from "./BackContainer";
import { PhoneIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { TwilioContext } from "@/context/twilio";
import { UiContext } from "@/context/ui";
import { InputMessage } from "./InputMessage";
import { BodyMessage } from "./BodyMessage";
import { getSession } from "next-auth/react";

interface Props {
  message?: any;
  setMessage?: any;
  backClick?: any;
  back?: boolean;
}

export const InboxMessage: FC<Props> = ({
  message,
  back,
  backClick,
  setMessage,
}) => {
  const { createCall, messages } = useContext(TwilioContext);
  const { to, height, typeMessage, setTo, setSelected, setTypeMessage } =
    useContext(UiContext);
  const scrollRef = useRef<HTMLDivElement>(null);

  const from =
    message?.from === process.env.NEXT_PUBLIC_PHONE_NUMBER
      ? message?.to
      : message?.from;

  const handleInput = async ({ target }: ChangeEvent<any>) => {
    const to = target.value;
    setTo(to);
    const find = messages.find(
      (message) => message.from === to || message.to === to
    );
    if (find) {
      setMessage(find);
      setTypeMessage("open");
      setTo("");
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [message]);

  return (
    <BackContainer back={back} backClick={backClick}>
      <div key={message?.sid}>
        <div
          className={`absolute flex top-40 p-1 ${
            typeMessage === "new" ? "left-36 mt-1" : "left-16  w-72"
          }`}
        >
          {typeMessage === "new" ? (
            <div className="flex-auto font-medium">New message</div>
          ) : (
            <>
              <div className="flex-auto w-96 font-medium">{from}</div>
              <div
                className="flex-auto cursor-pointer mt-1"
                onClick={() => {
                  setSelected(0);
                  createCall(from);
                }}
              >
                <div className="ml-2 -mt-3 flex h-8 w-8 flex-none items-center justify-center rounded-full hover:bg-gray-50 shadow-sm">
                  <PhoneIcon aria-hidden="true" className="h-5 w-5" />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="pt-10">
          {typeMessage === "new" ? (
            <>
              <div className="flex">
                <div className="m-2 items-center">
                  <div className="flex h-8 w-8 mt-1 ml-2 items-center justify-center ">
                    For:
                  </div>
                </div>
                <div className="flex-auto">
                  <input
                    id="contact"
                    value={to}
                    name="contact"
                    onChange={handleInput}
                    className="block w-full mt-2 p-2 pb-1 focus:outline-none sm:text-sm sm:leading-6 resize-none overflow-hidden"
                  />
                </div>
                <div className="m-2 items-center">
                  <div
                    className="flex h-8 w-8 mt-1 mr-2 items-center justify-center rounded-full cursor-pointer"
                    onClick={async () => {
                      const session = await getSession();
                      const user: any = session?.user;
                      if (user.role === "super") {
                        setSelected(2);
                      } else {
                        setSelected(1);
                      }
                    }}
                  >
                    <UserPlusIcon aria-hidden="true" className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <div
                ref={scrollRef}
                className={`border-t py-4 border-gray-50 overflow-y-scroll scrollbar-thin`}
                style={{ height: `${height}px` }}
              ></div>
            </>
          ) : (
            <div
              ref={scrollRef}
              className={`border-t py-4 border-gray-50 overflow-y-scroll scrollbar-thin`}
              style={{ height: `${height + 52}px` }}
            >
              {message?.children?.map((message: any, index: number) => (
                <div key={index}>
                  <BodyMessage message={message} from={from} />
                </div>
              ))}
              <BodyMessage message={message} from={from} />
            </div>
          )}
          <InputMessage to={typeMessage === "new" ? to : from} />
        </div>
      </div>
    </BackContainer>
  );
};
