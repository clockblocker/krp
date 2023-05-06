import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>КРП здорового человека</title>
        <meta name="description" content="Не называй патриотами кровопийц" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#9d9ef9] to-[#ffffff]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Не называй{" "}
            <span className="text-[hsl(219,41%,42%)]">патриотами </span>
            <span className="text-[hsl(349,59%,36%)]">кровопийц </span>
          </h1>
          <div className="flex">
            <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-black/10 p-1 text-black hover:bg-black/20">
              <h3 className="text-2xl font-bold">Общество</h3>
            </div>
            <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-black/10 p-1 text-black hover:bg-black/20">
              <h3 className="text-2xl font-bold">Ноющих</h3>
            </div>
            <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-black/10 p-1 text-black hover:bg-black/20">
              <h3 className="text-2xl font-bold">Кретинов</h3>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
