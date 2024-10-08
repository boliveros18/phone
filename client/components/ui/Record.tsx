import { FC, useState, useContext } from "react";
import { IRecording, IUser } from "@/interfaces";
import { PlayIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { TwilioContext } from "@/context/twilio";
import { UserContext } from "@/context/user";

interface Props {
  recording: IRecording;
  user: IUser;
}

export const Record: FC<Props> = ({ recording, user }) => {
  const { getAudioRecord } = useContext(TwilioContext);
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [focus, setFocus] = useState(true);
  const { users } = useContext(UserContext);

  const play = async () => {
    const blob = await getAudioRecord(recording);
    if (blob instanceof Blob) {
      const url = URL.createObjectURL(blob);
      setUrl(url);
    }
  };

  const userFrom = users.find((user) => user.sid === recording.fromFormatted);
  const userTo = users.find((user) => user.sid === recording.toFormatted);
  const fromFormatted = userFrom
    ? userFrom.name + " " + userFrom.lastname
    : recording.fromFormatted;
  const toFormatted = userTo
    ? userTo?.name + " " + userTo.lastname
    : recording.toFormatted;

  return (
    <>
      <div key={recording?.sid} className="flex h-60 hover:bg-gray-50">
        <div
          className={`flex flex-row transition-all duration-1000 ease-in-out ${
            focus ? "w-full opacity-100" : "w-0 opacity-0"
          }`}
        >
          <div className="flex flex-col justify-center w-44 pl-6">
            <div className={"font-semibold text-gray-600 h-5"}>
              {recording.fromFormatted === user.id
                ? user.name + " " + user.lastname
                : fromFormatted}
            </div>
            <div className={"flex text-xs text-gray-600 h5"}>
              <p className="mr-1 font-medium">To: </p>
              <p className="mr-4">
                {recording.toFormatted === user.id
                  ? user.name + " " + user.lastname
                  : toFormatted}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-28">
            <div className="text-gray-600 font-normal text-xs">
              {recording.dateCreated?.substring(0, 10)}
            </div>
            <div className="text-gray-600 font-normal text-xs">
              {recording.dateCreated?.substring(11, 19)}
            </div>
          </div>
          <div className="flex items-center justify-center w-24">
            <div
              className="flex h-5 w-5 mr-2 items-center justify-center rounded-md bg-red-400  hover:bg-red-300 cursor-pointer"
              onClick={() => {
                play();
                setFocus(false);
              }}
            >
              <PlayIcon aria-hidden="true" className="h-3 w-3 text-white" />
            </div>
          </div>
        </div>
        <div
          className={`flex items-center justify-center w-full bg-white transition-all duration-1000 ease-out ${
            focus ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="pl-5">
            <audio controls className="h-9" src={url}>
              <source type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
          <div className="flex p-2 ml-1 items-center justify-center">
            <div
              className="flex h-6 w-6 mt-1 mr-2 items-center justify-center rounded-full bg-gray-300  hover:bg-gray-200"
              onClick={() => {
                setFocus(true);
              }}
            >
              <XMarkIcon aria-hidden="true" className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
