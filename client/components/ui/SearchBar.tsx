import { FC, useState, ChangeEvent, useContext } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { StagingContext } from "@/context/staging";
import { UserContext } from "@/context/user";
import { TwilioContext } from "@/context/twilio";
import { UiContext } from "@/context/ui";
import { ICall, IContact, IMessage, IRecording, IUser } from "@/interfaces";

interface Props {
  type: string;
  isLoading?: boolean;
}

export const SearchBar: FC<Props> = ({ type, isLoading }) => {
  const { contacts, setFilteredContacts } = useContext(StagingContext);
  const { users, setFilteredUsers } = useContext(UserContext);
  const { setSearch } = useContext(UiContext);
  const {
    recordings,
    calls,
    messages,
    setFilteredRecordings,
    setFilteredCalls,
    setFilteredMessages,
  } = useContext(TwilioContext);
  const [focus, setFocus] = useState(false);
  const [inputs, setInputs] = useState<string>("");

  const setInitials = () => {
    setSearch(false);
    setFocus(false);
    setInputs("");
  };

  const handleInput = async ({ target }: ChangeEvent<any>) => {
    const value = target.value.toLowerCase();
    if (value.length === 0) {
      setSearch(false);
    } else {
      setSearch(true);
    }
    setInputs(value);
    switch (type) {
      case "users":
        setFilteredUsers(
          users.filter(
            (user: IUser) =>
              user.name?.toLowerCase().includes(value) ||
              user.lastname?.toLowerCase().includes(value) ||
              user.phone?.includes(value) ||
              user.fax?.includes(value) ||
              user.email?.includes(value) ||
              user.role?.includes(value) ||
              user.status?.includes(value)
          )
        );
        break;
      case "contacts":
        setFilteredContacts(
          contacts.filter(
            (contact: IContact) =>
              contact.name?.toLowerCase().includes(value) ||
              contact.phone?.includes(value) ||
              contact.email?.includes(value)
          )
        );
        break;
      case "inboundcalls":
        setFilteredCalls(
          calls.filter(
            (call: ICall) =>
              call.to?.toLowerCase().includes(value) ||
              call.toFormatted?.toLowerCase().includes(value) ||
              call.from?.toLowerCase().includes(value) ||
              call.fromFormatted?.toLowerCase().includes(value) ||
              call.dateCreated?.toLowerCase().includes(value)
          )
        );
        break;
      case "calls":
        setFilteredCalls(
          calls.filter(
            (call: ICall) =>
              call.to?.toLowerCase().includes(value) ||
              call.toFormatted?.toLowerCase().includes(value) ||
              call.from?.toLowerCase().includes(value) ||
              call.fromFormatted?.toLowerCase().includes(value) ||
              call.dateCreated?.toLowerCase().includes(value)
          )
        );
        break;
      case "voicemails":
        setFilteredRecordings(
          recordings.filter(
            (record: IRecording) =>
              record.toFormatted?.toLowerCase().includes(value) ||
              record.fromFormatted?.toLowerCase().includes(value) ||
              record.dateCreated?.toLowerCase().includes(value)
          )
        );
        break;
      case "recordings":
        setFilteredRecordings(
          recordings.filter(
            (record: IRecording) =>
              record.toFormatted?.toLowerCase().includes(value) ||
              record.fromFormatted?.toLowerCase().includes(value) ||
              record.dateCreated?.toLowerCase().includes(value)
          )
        );
        break;
      case "messages":
        setFilteredMessages(
          messages.filter(
            (message: IMessage) =>
              message.to?.toLowerCase().includes(value) ||
              message.from?.toLowerCase().includes(value) ||
              message.dateCreated?.toLowerCase().includes(value) ||
              message.body?.toLocaleLowerCase().includes(value)
          )
        );
        break;
    }
  };

  return (
    <div className="flex items-center justify-center relative mt-2 rounded-md">
      <div className="pointer-events-none absolute inset-y-0 left-3 bottom-6 flex items-center pl-3">
        <span className="text-gray-500 sm:text-sm">
          <MagnifyingGlassIcon
            aria-hidden="true"
            className="h-5 w-5 text-gray-400"
          />
        </span>
      </div>
      <input
        type="text"
        className={`block bg-slate-50 w-full rounded-md ml-5 mb-6 py-1.5 pl-7 pr-20 text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:outline-0 sm:text-sm sm:leading-6 transition-all duration-500 ease-in-out ${
          focus ? "mr-1" : "-mr-16"
        }`}
        value={inputs}
        name="search"
        autoComplete="off"
        placeholder="Search"
        onFocus={() => {
          setFocus(true);
          setSearch(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        onChange={handleInput}
        disabled={isLoading}
      />
      <button
        type="button"
        className={`rounded-md bg-white px-3 py-2 text-sm font-normal mb-6 mr-4 text-indigo-600 sm:mt-0 sm:w-auto transition-opacity duration-1000 ease-in-out ${
          focus ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => {
          setInitials();
        }}
      >
        Cancel
      </button>
    </div>
  );
};
