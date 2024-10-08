import { useContext, useCallback, useEffect, useState } from "react";
import { Container } from "../ui/Container";
import { TwilioContext } from "@/context/twilio";
import { UiContext } from "@/context/ui";
import { SearchBar } from "../ui/SearchBar";
import { Call } from "../ui/Call";
import { ICall } from "@/interfaces";
import { Loading } from "../ui/Loading";
import { TabContent } from "../ui/TabContent";
import { Pagination } from "../ui/Pagination";
import { getSession } from "next-auth/react";
import { UsersIcon } from "@heroicons/react/24/outline";

export const History = () => {
  const { filteredCalls, calls, getCalls } = useContext(TwilioContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { search, sid, setSid } = useContext(UiContext);
  const [user, setUser] = useState<any>();
  const [paginates, setPaginates] = useState<ICall[]>(calls.slice(0, 6));

  const setInitialState = useCallback(async () => {
    const session = await getSession();
    const user: any = session?.user;
    setUser(user);
    setIsLoading(true);
    getCalls(1, true, sid, user.id, user.role).finally(() => {
      setIsLoading(false);
    });
  }, [sid, getCalls]);

  useEffect(() => {
    setInitialState();
  }, [setInitialState]);

  const pagination = (pageNumber: number, pageSize: number) => {
    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize;
    return calls.slice(start, end);
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
    <Container
      title="History"
      display={user?.role === "super"}
      Icon={UsersIcon}
      onClick={() => {
        setSid("");
      }}
    >
      <TabContent>
        <SearchBar type="calls" isLoading={isLoading} />
        {isLoading ? (
          <div className="h-365">
            <Loading />
          </div>
        ) : search ? (
          <div className="h-420 overflow-y-scroll scrollbar-thin shadow-lg rounded-b-3xl">
            {filteredCalls.map((call: ICall) => (
                  <Call key={call.sid} call={call} user={user} />
                ))}
          </div>
        ) : (
          <div className="h-365">
            {paginates.map((call: ICall) => (
              <Call key={call.sid} call={call} user={user} />
            ))}
          </div>
        )}
        <Pagination
          pageNumber={pageNumber}
          length={6}
          upClick={upClick}
          downClick={downClick}
          items={filteredCalls}
        />
      </TabContent>
    </Container>
  );
};
