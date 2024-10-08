import { FC, useContext, useCallback, useEffect, useState } from "react";
import { TwilioContext } from "@/context/twilio";
import { UiContext } from "@/context/ui";
import { IRecording } from "@/interfaces";
import { SearchBar } from "../ui/SearchBar";
import { Loading } from "../ui/Loading";
import { Record } from "../ui/Record";
import { TabContent } from "./TabContent";
import { Pagination } from "./Pagination";
import { UsersIcon } from "@heroicons/react/24/outline";
import { Container } from "./Container";
import { getSession } from "next-auth/react";

interface Props {
  title: string;
  type: string;
  verb: string;
  records: IRecording[];
}

export const RecordList: FC<Props> = ({ title, type, verb, records }) => {
  const { filteredRecordings, getRecordings } =
    useContext(TwilioContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { search, sid, setSid } = useContext(UiContext);
  const [user, setUser] = useState<any>();
  const [paginates, setPaginates] = useState<IRecording[]>(
    records.slice(0, 6)
  );

  const setInitialState = useCallback(async () => {
    const session = await getSession();
    const user: any = session?.user;
    setUser(user);
    setIsLoading(true);
    getRecordings(verb, 1, true, sid, user.id, user.role).finally(() => {
      setIsLoading(false);
    });
  }, [sid, verb, getRecordings, setUser]);

  useEffect(() => {
    setInitialState();
  }, [setInitialState]);

  const pagination = (pageNumber: number, pageSize: number) => {
    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize;
    return records.slice(start, end);
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
      title={title}
      display={user?.role === "super"}
      Icon={UsersIcon}
      onClick={() => {
        setSid("");
      }}
    >
      <TabContent>
        <SearchBar type={type} isLoading={isLoading} />
        {isLoading ? (
          <div className="h-365">
            <Loading />
          </div>
        ) : search ? (
          <div className="h-420 overflow-y-scroll scrollbar-thin shadow-lg rounded-b-3xl overflow-x-hidden">
            {filteredRecordings.map((recording: IRecording) => (
              <Record key={recording.sid} recording={recording} user={user} />
            ))}
          </div>
        ) : (
          <div className="h-365">
            {paginates.map((recording: IRecording) => (
              <Record key={recording.sid} recording={recording} user={user} />
            ))}
          </div>
        )}
        <Pagination
          pageNumber={pageNumber}
          length={6}
          upClick={upClick}
          downClick={downClick}
          items={filteredRecordings}
        />
      </TabContent>
    </Container>
  );
};
