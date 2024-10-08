import { FC, Fragment, useContext } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { UiContext } from "@/context/ui";
import {
  Users,
  Contacts,
  Dialing,
  InBoundCall,
  VoiceMails,
  Records,
  History,
  Messages,
  Faxing,
} from "@/components/navigation";

interface Props {
  role: string;
}

export const TabGroupUi: FC<Props> = ({ role }) => {
  const { tabs, minimize, selected, setTabs, setMinimize, setSelected } =
    useContext(UiContext);
  const admin = role === "super";

  const UpdateTab = (index: number) => {
    const newTabs = tabs.map((tab: any, idx: number) =>
      idx === (admin ? index : index + 1)
        ? {
            ...tab,
            notification: {
              ...tab.notification,
              open: true,
              display: false,
              number: 0,
            },
          }
        : tab
    );
    setTabs(newTabs);
    setMinimize(false);
    setSelected(index);
  };

  const components = [
    <Dialing key="0" />,
    ...(admin ? [<Users key="1" />] : []),
    <Contacts key="2" />,
    <InBoundCall key="3" />,
    <VoiceMails key="4" />,
    <Records key="5" />,
    <History key="6" />,
    <Messages key="7" />,
    // <Faxing key="8" />,
  ];

  const renderComponent = () => {
    return components[selected];
  };

  return (
    <>
      <TabGroup className={`${minimize && admin ? "pt-6 mb-2" : ""}`}>
        <div
          className={`${
            !minimize ? "border-b border-gray-200" : ""
          } px-3 w-full`}
        >
          <TabList className="flex">
            {tabs
              .filter((_: any, index: number) =>
                admin ? index !== -1 : index !== 1
              )
              .map((item: any, index: number) => (
                <Tab
                  key={item.name}
                  className={`flex whitespace-nowrap ${
                    !minimize ? "border-b-2" : ""
                  } border-transparent text-base font-medium ${
                    selected === index
                      ? "data-[selected]:border-indigo-600 data-[selected]:text-indigo-600"
                      : ""
                  } focus:outline-none`}
                  data-selected={selected === index ? "true" : undefined}
                  onClick={() => UpdateTab(index)}
                >
                  <div key={item.name} className="group flex">
                    <div className="mt-1 flex h-10 w-10 flex-none items-center justify-center bg-white group-hover:bg-gray-50 ">
                      <item.icon
                        className="h-6 w-6 group-hover:text-indigo-500 "
                        title={item.name}
                      />
                      {item.notification.display && !item.notification.open && (
                        <span className="relative bottom-2 right-2 -mr-3 block h-3 w-3 rounded-full  ring-2 ring-white bg-red-500 text-white text-xxs font-bold">
                          <span
                            className="relative top-[-0.3rem]"
                            title="notifications"
                          >
                            {item.notification.number}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                </Tab>
              ))}
          </TabList>
        </div>
        {!minimize && (
          <TabPanels as={Fragment}>
            {tabs.map((item: any) => (
              <TabPanel key={item.name}>{renderComponent()}</TabPanel>
            ))}
          </TabPanels>
        )}
      </TabGroup>
    </>
  );
};
