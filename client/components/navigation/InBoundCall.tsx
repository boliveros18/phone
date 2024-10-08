import { useContext, useCallback, useEffect, useState } from "react";
import { Container } from "../ui/Container";
import { TwilioContext } from "@/context/twilio";
import { UiContext } from "@/context/ui";
import { ICall } from "@/interfaces";
import { SearchBar } from "../ui/SearchBar";
import { Loading } from "../ui/Loading";
import { Call } from "../ui/Call";
import { TabContent } from "../ui/TabContent";
import { Pagination } from "../ui/Pagination";
import { UsersIcon } from "@heroicons/react/24/outline";
import { getSession } from "next-auth/react";

export const InBoundCall = () => {
  const { filteredCalls, inbounds, getInboundCalls } =
    useContext(TwilioContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { search, sid, setSid } = useContext(UiContext);
  const [user, setUser] = useState<any>();
  const [paginates, setPaginates] = useState<ICall[]>(inbounds.slice(0, 6));

  const setInitialState = useCallback(async () => {
    const session = await getSession();
    const user: any = session?.user;
    setUser(user);
    setIsLoading(true);
    getInboundCalls(1, true, sid, user.id, user.role).finally(() => {
      setIsLoading(false);
    });
  }, [sid, getInboundCalls]);


  console.log(paginates);

  useEffect(() => {
    setInitialState();
  }, [setInitialState]);

  const pagination = (pageNumber: number, pageSize: number) => {
    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize;
    return inbounds.slice(start, end);
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
      title="InBoundCall"
      display={user?.role === "super"}
      Icon={UsersIcon}
      onClick={() => {
        setSid("");
      }}
    >
      <TabContent>
        <SearchBar type="inboundcalls" isLoading={isLoading} />
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
