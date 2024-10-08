import Head from "next/head";
import { Exo } from "next/font/google";
import { Phone } from "@/components/home/Phone";

const exo = Exo({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Phone</title>
        <meta name="description" content="building calls" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={exo.className}>
        <Phone />
      </main>
    </>
  );
}
