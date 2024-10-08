import { useEffect, useContext, useCallback, useState } from "react";
import { Layout } from "@/components/layouts/Layout";
import { TabGroupUi } from "@/components/ui/TabGroupUi";
import { Exo } from "next/font/google";
import { AccountLayout } from "@/components/layouts/AccountLayout";
import { TwilioContext } from "@/context/twilio";
import { UserContext } from "@/context/user";
import { UiContext } from "@/context/ui";
import { Loading } from "../ui/Loading";
import { signIn, signOut } from "next-auth/react";
import { TwilioService } from "@/services";

const exo = Exo({
  subsets: ["latin"],
});

export const Phone = () => {
  const { getMessages } = useContext(TwilioContext);
  const { isLoading, setIsLoading } = useContext(UiContext);
  const { user, getUserSession, createUser } = useContext(UserContext);
  const [_user, setUser] = useState<any>();

  const setInitialState = useCallback(() => {
    setIsLoading(true);
    getMessages(1, false).finally(() => {
      getMessages(1, true).finally(() => {
        setIsLoading(false);
      });
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
    const messageHandler = async (event: MessageEvent) => {
      if (event.data.unload) {
        await TwilioService.updateOfflineStatus(user?.id || "");
        signOut();
      }
    };
    window.addEventListener("message", messageHandler);
    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, [user]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={exo.className}>
      <Layout>
        {isLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <AccountLayout user={_user}>
            <TabGroupUi role={_user?.role} />
          </AccountLayout>
        )}
      </Layout>
    </div>
  );
};
