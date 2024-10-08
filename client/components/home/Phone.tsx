import { useEffect, useContext, useCallback, useState } from "react";
import { Layout } from "@/components/layouts/Layout";
import { TabGroupUi } from "@/components/ui/TabGroupUi";
import { Exo } from "next/font/google";
import { AccountLayout } from "@/components/layouts/AccountLayout";
import { TwilioContext } from "@/context/twilio";
import { UserContext } from "@/context/user";
import { UiContext } from "@/context/ui";
import { Loading } from "../ui/Loading";
import { signIn, signOut, getSession } from "next-auth/react";
import { TwilioService } from "@/services";

const exo = Exo({
  subsets: ["latin"],
});

export const Phone = () => {
  const { getMessages } = useContext(TwilioContext);
  const { isLoading, setIsLoading } = useContext(UiContext);
  const { getUserSession, createUser } = useContext(UserContext);
  const [user, setUser] = useState<any>();

  const setInitialState = useCallback(() => {
    setIsLoading(true);
    getMessages(1, true).finally(() => {
      setIsLoading(false);
    });
  }, [getMessages, setIsLoading]);

  const checkConnection = useCallback(() => {
    window.addEventListener("offline", async (event) => {
      event.preventDefault();
      alert(
        "The network connection has been lost. Close the application until the connection is recovered."
      );
    });
  }, []);

  const beforeUnload = useCallback(() => {
    window.addEventListener("beforeunload", async (event) => {
      event.preventDefault();
      const session = await getSession();
      const user: any = session?.user;
      await TwilioService.updateOfflineStatus(user.id);
      signOut();
    });
  }, []);

  const Session = useCallback(
    async (
      id: string,
      token: string,
      name: string,
      lastname: string,
      phone: string,
      fax: string,
      email: string,
      role: string
    ) => {
      const _user: any = await getUserSession(id);
      if (_user.sid === id) {
        await signIn("credentials", {
          id,
          token,
          name,
          lastname,
          phone,
          fax,
          email,
          role,
          redirect: false,
        });
      } else {
        await createUser({
          name: name,
          lastname: lastname,
          phone: phone,
          fax: fax,
          email: email,
          role: role,
          sid: id,
          status: "",
        }).then(async (user: any) => {
          const id = user.sid;
          await signIn("credentials", {
            id,
            token,
            name,
            lastname,
            phone,
            fax,
            email,
            role,
            redirect: false,
          });
        });
      }
    },
    [createUser, getUserSession]
  );
  const credentials = useCallback(() => {
    const messageHandler = async (event: MessageEvent) => {
      if (event.data.id) {
        const { id, token, name, lastname, phone, fax, email, role } =
          event.data;
        setUser({ id, token, name, lastname, phone, fax, email, role });
        Session(id, token, name, lastname, phone, fax, email, role);
      }
    };
    window.addEventListener("message", messageHandler);
    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, [Session]);

  useEffect(() => {
    setInitialState();
    credentials();
    checkConnection();
    beforeUnload();
  }, [beforeUnload, setInitialState, credentials, checkConnection]);

  return (
    <div className={exo.className}>
      <Layout>
        {isLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <AccountLayout user={user}>
            <TabGroupUi role={user?.role} />
          </AccountLayout>
        )}
      </Layout>
    </div>
  );
};
