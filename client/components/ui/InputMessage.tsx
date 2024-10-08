import { FC, useContext, ChangeEvent, useState } from "react";
import {
  PaperClipIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { TwilioContext } from "@/context/twilio";
import { UiContext } from "@/context/ui";
import Image from "next/image";
import { injectMessage } from "@/utils/functions";

interface Props {
  to: string;
}

export const InputMessage: FC<Props> = ({ to }) => {
  const {
    createMessage,
    setMessage,
    messages,
    filteredMessages,
    preFilteredMessages,
  } = useContext(TwilioContext);
  const [inputs, setInputs] = useState<string>("");
  const { rows, setHeight, setRows, setTypeMessage } = useContext(UiContext);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
      event.target.value = "";
    }
  };

  const handleInput = async ({ target }: ChangeEvent<any>) => {
    const value = target.value.toLowerCase();
    setInputs(value);
    const characters = target.value.length;
    const charactersPerRow = 34;
    const initialHeight = 350;
    const heightDecrement = 22;

    if (characters === 0) {
      setHeight(initialHeight);
      setRows(1);
    } else {
      const newRows = Math.ceil(characters / charactersPerRow);
      const newHeight = initialHeight - (newRows - 1) * heightDecrement;
      if (newRows < 7) {
        setRows(newRows);
        setHeight(newHeight);
      }
    }
  };

  return (
    <div className="flex">
      <div className="m-2 items-center hidden">
        <label htmlFor="file-input">
          <div className="flex h-8 w-8 mt-1 ml-2 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-50 cursor-pointer">
            <PaperClipIcon aria-hidden="true" className="h-5 w-5" />
          </div>
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="file-input"
          disabled
        />
      </div>
      <div className="flex-auto ml-4">
        {files.length !== 0 ? (
          <div className="border rounded-md -mt-32 h-44 bg-white">
            <div className="absolute bottom-14 border ml-2 border-gray-50 rounded-md">
              {Array.from(files).map((file, index) => (
                <div key={index} className="flex items-center mt-2">
                  {file.type.startsWith("image/") && (
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      width={10}
                      height={10}
                      className="h-28 w-24 object-cover"
                    />
                  )}
                  <span
                    className="absolute right-1 top-1"
                    onClick={() => {
                      setFiles([]);
                    }}
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border-white bg-black bg-opacity-15 hover:bg-opacity-35 cursor-pointer">
                      <XMarkIcon
                        aria-hidden="true"
                        className="h-4 w-4 text-white"
                      />
                    </div>
                  </span>
                </div>
              ))}
            </div>
            <div>
              <hr className="absolute border-gray-100 w-272 bottom-12" />
              <input
                id="message"
                name="message"
                onChange={handleInput}
                placeholder="Comment or send"
                className="block w-full mt-36 pl-2  placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 resize-none overflow-hidden"
              />
            </div>
          </div>
        ) : (
          <textarea
            id="message"
            name="message"
            rows={rows}
            onChange={handleInput}
            placeholder="Text message"
            className="block w-full bg-gray-50 mt-2 p-2 pb-1 rounded-md placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 resize-none overflow-hidden"
          />
        )}
      </div>
      <div className="m-2 items-center">
        <div
          className="flex h-8 w-8 mt-0.5 mr-2 items-center justify-center rounded-full bg-green-300 hover:bg-green-200 cursor-pointer"
          onClick={async () => {
            if (inputs.length > 0) {
              setInputs("");
              const newMsg = {
                to: to,
                from: process.env.NEXT_PUBLIC_PHONE_NUMBER,
                body: inputs,
                dateCreated: new Date().toISOString(),
                sid: new Date().getTime().toString(),
              };
              const newMessage = await createMessage(to, inputs).catch(
                (response) => {
                  setMessage({
                    ...newMsg,
                    errorMessage: response.message,
                  });
                }
              );
              injectMessage(
                newMessage,
                messages,
                filteredMessages,
                preFilteredMessages
              );
              setMessage(messages[0]);
            } else {
              window.alert("Your body message is empty!");
            }
            setTypeMessage("open");
          }}
        >
          <ChevronRightIcon aria-hidden="true" className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};
