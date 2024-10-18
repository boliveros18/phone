import { useEffect, useContext, useState, useCallback } from "react";
import { Container } from "../ui/Container";
import { StagingContext } from "@/context/staging";
import { UiContext } from "@/context/ui";
import { Contact } from "../ui/Contact";
import { Loading } from "../ui/Loading";
import { IContact } from "@/interfaces";
import { Card } from "../ui/Card";
import { SearchBar } from "../ui/SearchBar";
import { Pagination } from "../ui/Pagination";
import { TabContent } from "../ui/TabContent";
import { getSession } from "next-auth/react";

export const Contacts = ({}) => {
  const { filteredContacts, contacts, getContacts, paginates, setPaginates } =
    useContext(StagingContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState<IContact>();
  const { search } = useContext(UiContext);

  const setInitialState = useCallback(async () => {
    const session = await getSession();
    const user: any = session?.user;
    setIsLoading(true);
    getContacts(user?.token)
      .then((contacts) => {
        setPaginates(contacts.slice(0, 9));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [getContacts, setPaginates]);

  useEffect(() => {
    setInitialState();
  }, [setInitialState]);

  const pagination = (pageNumber: number, pageSize: number) => {
    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize;
    return contacts.slice(start, end);
  };

  const downClick = () => {
    if (pageNumber >= 1) {
      setPageNumber(pageNumber + 1);
      setPaginates(pagination(pageNumber + 1, 9));
    }
  };

  const upClick = () => {
    if (pageNumber >= 1) {
      setPageNumber(pageNumber - 1);
      setPaginates(pagination(pageNumber - 1, 9));
    }
  };

  return (
    <Container title="Contacts">
      <TabContent>
        {!open && <SearchBar type="contacts" isLoading={isLoading} />}
        {isLoading ? (
          <div className="h-365">
            <Loading />
          </div>
        ) : !open ? (
          search ? (
            <div className="h-420 overflow-y-scroll scrollbar-thin shadow-lg rounded-b-3xl">
              {filteredContacts.map((contact: IContact) => (
                <Contact
                  key={contact.contactId}
                  contact={contact}
                  action={() => {
                    setContact(contact);
                    setOpen(true);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="mx-5 h-365">
              {paginates?.map((contact) => (
                <Contact
                  key={contact.contactId}
                  contact={contact}
                  action={() => {
                    setContact(contact);
                    setOpen(true);
                  }}
                />
              ))}
            </div>
          )
        ) : (
          <Card
            contact={contact}
            backClick={() => setOpen(false)}
            back={true}
          />
        )}
        <Pagination
          open={open}
          pageNumber={pageNumber}
          length={9}
          upClick={upClick}
          downClick={downClick}
          items={filteredContacts}
        />
      </TabContent>
    </Container>
  );
};
