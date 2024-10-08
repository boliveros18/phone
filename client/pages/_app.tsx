import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UiProvider } from "@/context/ui";
import { UserProvider } from "@/context/user";
import { StagingProvider } from "@/context/staging";
import { TwilioProvider } from "@/context/twilio";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <StagingProvider>
        <UiProvider>
          <TwilioProvider>
              <Component {...pageProps} />
          </TwilioProvider>
        </UiProvider>
      </StagingProvider>
      </UserProvider>
  );
}
