import { FC, ReactNode, useContext, useState } from "react";
import { MainHeader } from "../headers/MainHeader";
import { MinusIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import { TabGroupUi } from "../ui/TabGroupUi";
import { UiContext } from "@/context/ui";
import { Settings } from "../navigation/Settings";
import { IUser } from "@/interfaces";

interface Props {
  children?: ReactNode;
  user: IUser;
}

export const AccountLayout: FC<Props> = ({ children, user }) => {
  const { minimize, setMinimize } = useContext(UiContext);
  const [openSettings, handleOpenSettings] = useState(false);

  const minimizeClick = () => {
    setMinimize(!minimize);
  };

  const settingsClose = () => {
    handleOpenSettings(false);
  };

  return (
    <>
      <div className="flex mb-1">
        {!minimize ? <MainHeader user={user} /> : <TabGroupUi role={user?.role || ""}/>}
        <div className="flex fixed align-top right-3">
          <button
            type="button"
            className="mt-3 mr-3 rounded-lg shadow-sm hover:bg-gray-50 "
            onClick={() => handleOpenSettings(true)}
          >
            <span className="sr-only">Settings</span>
            {!minimize && (
              <Cog8ToothIcon
                aria-hidden="true"
                className="h-5 w-5 text-gray-900"
                title="Settings"
              />
            )}
          </button>
          <button
            type="button"
            className="mt-3 mr-2 rounded-lg shadow-sm hover:bg-gray-50"
            onClick={minimizeClick}
          >
            <span className="sr-only">Minimize</span>
            {minimize ? (
              <ChevronDownIcon
                aria-hidden="true"
                className="h-5 w-5 text-gray-900"
                title="expand"
              />
            ) : (
              <MinusIcon
                aria-hidden="true"
                className="h-5 w-5 text-gray-900"
                title="minimize"
              />
            )}
          </button>
        </div>
      </div>
      {!minimize && !openSettings && children}
      {!minimize && openSettings && (
        <Settings close={settingsClose} user={user}/>
      )}
    </>
  );
};
