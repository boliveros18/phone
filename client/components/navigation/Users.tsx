import { useContext, useCallback, useEffect, useState } from "react";
import { UserContext } from "@/context/user";
import { Container } from "@/components/ui/Container";
import { User } from "@/components/ui/User";
import { Loading } from "@/components/ui/Loading";
import { SearchBar } from "../ui/SearchBar";
import { TabContent } from "../ui/TabContent";
import { UiContext } from "@/context/ui";
import { Profile } from "../ui/Profile";
import { IUser } from "@/interfaces";
import { BackContainer } from "../ui/BackContainer";

export const Users = () => {
  const { users, filteredUsers, getUsers } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { search, setSelected, setSid } = useContext(UiContext);
  const [user, setUser] = useState<IUser>();

  const setInitialState = useCallback(() => {
    getUsers().finally(() => {
      setIsLoading(false);
    });
  }, [getUsers]);

  useEffect(() => {
    setInitialState();
  }, [setInitialState]);

  const handlerAction = (action: number, sid: string) => {
    setSid(sid);
    switch (action) {
      case 0:
        setSelected(3);
        break;
      case 1:
        setSelected(6);
        break;
      case 2:
        setSelected(5);
        break;
      case 3:
        setUser(users.find((user) => user.sid === sid));
        setOpen(true);
        break;
    }
  };

  return (
    <Container title="Users">
      <TabContent>
        {!open && <SearchBar type="users" isLoading={isLoading} />}
        {isLoading ? (
          <div className="h-365">
            <Loading />
          </div>
        ) : !open ? (
          search ? (
            <div className="h-420 overflow-y-scroll scrollbar-thin">
              {filteredUsers?.map((user) => (
                <User key={user.sid} user={user} action={handlerAction} />
              ))}
            </div>
          ) : (
            <div className="h-420 overflow-y-scroll scrollbar-thin">
              {users?.map((user) => (
                <User key={user.sid} user={user} action={handlerAction} />
              ))}
            </div>
          )
        ) : (
          <BackContainer back={true} backClick={() => setOpen(false)}>
            <Profile user={user} />
          </BackContainer>
        )}
      </TabContent>
    </Container>
  );
};
