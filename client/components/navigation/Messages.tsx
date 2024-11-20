import { FC, useState, useContext, useEffect } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TwilioContext } from "@/context/twilio";
import { UiContext } from "@/context/ui";
import { Container } from "../ui/Container";
import { SearchBar } from "../ui/SearchBar";
import { Loading } from "../ui/Loading";
import { Message } from "../ui/Message";
import { InboxMessage } from "../ui/InboxMessage";
import { TabContent } from "../ui/TabContent";
import { Pagination } from "../ui/Pagination";
import { IMessage } from "@/interfaces";

interface Props {}

export const Messages: FC<Props> = ({}) => {
  const { filteredMessages, messages, newMessage, setMessage } =
    useContext(TwilioContext);
  const [pageNumber, setPageNumber] = useState(1);
  const {
    search,
    inboxMessageToogle,
    isLoading,
    setInboxMessageToogle,
    setTypeMessage,
  } = useContext(UiContext);
  const [paginates, setPaginates] = useState<IMessage[]>(messages.slice(0, 6));

  useEffect(() => {}, [newMessage]);

  const pagination = (pageNumber: number, pageSize: number) => {
    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize;
    return messages.slice(start, end);
  };

  const downClick = () => {
    if (pageNumber >= 1) {
      setPageNumber(pageNumber + 1);
      setPaginates(pagination(pageNumber + 1, 6));
    }
  };

  const upClick = () => {
    if (pageNumber >= 1) {
      setPageNumber(pageNumber - 1);
      setPaginates(pagination(pageNumber - 1, 6));
    }
  };

  return (
    <Container title="Messages">
      <TabContent>
        {!inboxMessageToogle && (
          <SearchBar type="messages" isLoading={isLoading} />
        )}
        {isLoading ? (
          <div className="h-365">
            <Loading />
          </div>
        ) : !inboxMessageToogle ? (
          <>
            {search ? (
              <div className="h-420 overflow-y-scroll scrollbar-thin shadow-lg rounded-b-3xl">
                {filteredMessages.map((message: any) => (
                  <Message
                    key={message.sid}
                    message={message}
                    action={() => {
                      message.unread = false;
                      setMessage(message);
                      setTypeMessage("open");
                      setInboxMessageToogle(true);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="h-365">
                {paginates.map((message: any) => (
                  <Message
                    key={message.sid}
                    message={message}
                    action={() => {
                      message.unread = false;
                      setMessage(message);
                      setTypeMessage("open");
                      setInboxMessageToogle(true);
                    }}
                  />
                ))}
                <div
                  className="absolute bottom-24 right-6 bg-transparent"
                  onClick={() => {
                    setTypeMessage("new");
                    setInboxMessageToogle(true);
                  }}
                >
                  <div className="flex flex-none h-11 w-11 items-center justify-center rounded-full cursor-pointer bg-orange-200 hover:bg-orange-100">
                    <PencilSquareIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-blacks "
                    />
                  </div>
                </div>
              </div>
            )}
            <Pagination
              pageNumber={pageNumber}
              length={6}
              upClick={upClick}
              downClick={downClick}
              items={filteredMessages}
            />
          </>
        ) : (
          <InboxMessage
            message={newMessage}
            backClick={() => {
              setInboxMessageToogle(false);
              setTypeMessage("");
            }}
            setMessage={setMessage}
            back={true}
          />
        )}
      </TabContent>
    </Container>
  );
};
