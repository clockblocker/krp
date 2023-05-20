"use client";

import { type NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import { useState } from "react";
import SpinnablePicker from "~/componenets/picker";

const one = [
  "Лига",
  "Группа",
  "Отряд",
  "Сборище",
  "Кучка",
  "Горстка",
  "Кооператив",
  "Выводок",
  "Cтая",
  "Рота",
];

const two = [
  "взволнованных",
  "анонимных",
  "отборных",
  "конченых",
  "отбитых",
  "мамкиных",
  "подвальных",
  "отставных",
  "диванных",
  "обиженных",
  "злобных",
];

const three = [
  "лоботрясов",
  "безработных",
  "кровопийц",
  "отщепенцев",
  "нытиков",
  "дегенератов",
  "освободителей",
  "геостратегов",
  "долбоебов",
  "курильщиков",
  "инакомыслящих",
  "джентльменов",
  "дегенератов",
  "пенсионеров",
  "маньяков",
  "уголовников",
  "мракобесов",
  "терпил",
  "реваншистов",
  "милитаристов",
  "неудачников",
  "упырей ",
];
// bg-black/10 p-1 text-black hover:bg-black/20
// bg-black/10 p-1 text-black hover:bg-black/20

function getRandomInt(max: number, toAvoid?: number) {
  while (true) {
    const res = Math.floor(Math.random() * max);
    if (res !== toAvoid) {
      return res;
    }
  }
}

const suggestionPairs = [
  ["Вы хотели сказать", "?"],
  ["Возможно вы имели в виду", "."],
  ["Только:", "."],
  ["Может лучше", "?"],
];

const makeSuggestion = (one: string, two: string, three: string) => {
  const n = getRandomInt(suggestionPairs.length);
  return `${(suggestionPairs[n] ?? [""])[0]} ${one} ${two} ${three}${
    (suggestionPairs[n] ?? [""])[1]
  }`;
};

const Home: NextPage = () => {
  const [initialOne, setInitialOne] = useState(2);
  const [selectedOne, setSelectedOne] = useState(one[initialOne] || "");

  const [initialTwo, setInitialTwo] = useState(5);
  const [selectedTwo, setSelectedTwo] = useState(two[initialTwo] || "");

  const [initialThree, setInitialThree] = useState(6);
  const [selectedThree, setSelectedThree] = useState(three[initialThree] || "");

  const bound = (f: (n: number) => void, a: Array<any>) => {
    return (n: number) => {
      console.log("n > 0 && n < a.length", 0, n, a.length);
      n >= 0 && n < a.length ? f(n) : null;
    };
  };
  // min-h-screen
  return (
    <>
      <Head>
        <title>КРП здорового человека</title>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@clockblocker_" />
        <meta name="twitter:title" content="Не называй патриотами кровопийц" />
        <meta
          name="twitter:description"
          content="Лига взволнованных лоботрясов? Кучка мамкиных геостратегов? Собери название по вкусу!"
        />
        <meta
          name="twitter:image"
          content="https://drive.google.com/file/d/1g69KATv4OJjnxff73TGzhI6-WXZosq-a/view"
        />
        <meta
          name="description"
          content="Лига взволнованных лоботрясов? Кучка мамкиных геостратегов? Собери название по вкусу!"
        />
        <link rel="icon" href="/trans_str.png" />
      </Head>

      <main className="flex flex-col items-center justify-center bg-gradient-to-b from-[#9d9ef9] to-[#ffffff]">
        <div className="container flex flex-col items-center justify-center px-4 py-8 ">
          <h1 className="select-none text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Не называй
          </h1>
          <h1 className="select-none text-5xl font-extrabold tracking-tight text-[hsl(219,41%,42%)] sm:text-[5rem]">
            патриотами
          </h1>
          <h1 className="select-none text-5xl font-extrabold tracking-tight text-[hsl(349,61%,50%)] sm:text-[5rem]">
            кровопийц
          </h1>
        </div>
        <div className="flex flex-col">
          <h3 className="text-center text-3xl font-bold">{`${one[initialOne]}`}</h3>
          <h3 className="text-center text-3xl font-bold">{`${two[initialTwo]} ${selectedThree}`}</h3>
        </div>
        <br></br>
        <div className="flex">
          <SpinnablePicker
            options={one}
            initialIndex={initialOne}
            setInitialIndex={(n: number) => bound(setInitialOne, one)(n)}
            // indexChanged={(n) => setSelectedOne(one[n] ?? "")}
            size={"small"}
          />
          <SpinnablePicker
            options={two}
            initialIndex={initialTwo}
            setInitialIndex={(n: number) => bound(setInitialTwo, two)(n)}
            // indexChanged={(n) => setSelectedTwo(two[n] ?? "")}
          />
          <SpinnablePicker
            options={three}
            initialIndex={initialThree}
            setInitialIndex={(n: number) => bound(setInitialThree, three)(n)}
            // indexChanged={(n) => setSelectedThree(three[n] ?? "")}
            size={"medium"}
          />
        </div>
        <div className="flex flex-row justify-center">
          <button
            className=" d-flex ml-5 w-20 select-none rounded border-2  border-black bg-[hsl(219,41%,42%)]/0 p-1 text-black visited:bg-[hsl(219,41%,42%)]/40 hover:bg-[hsl(219,41%,42%)]/20 active:bg-[hsl(219,41%,42%)]/50"
            onClick={() => {
              bound(setInitialOne, one)(getRandomInt(one.length, initialOne));
              bound(setInitialTwo, two)(getRandomInt(two.length, initialTwo));
              bound(
                setInitialThree,
                three
              )(getRandomInt(three.length, initialThree));
            }}
          >
            <Image width={500} height={500} src="/rotate2.png" alt="Наугад" />
          </button>
          <button
            className=" d-flex ml-5 w-20 select-none rounded border-2  border-black bg-[hsl(219,41%,42%)]/0 p-1 text-black visited:bg-[hsl(219,41%,42%)]/40 hover:bg-[hsl(219,41%,42%)]/20 active:bg-[hsl(219,41%,42%)]/50"
            onClick={() => {
              void (async () => {
                await navigator.clipboard.writeText(
                  `${selectedOne} ${selectedTwo} ${selectedThree}`
                );
              })();
            }}
          >
            <Image width={500} height={500} src="/copy.png" alt="Copy" />
          </button>
        </div>
        <a
          className="twitter-share-button"
          href={`https://twitter.com/intent/tweet?url=https://krp.vercel.app/&text=${makeSuggestion(
            one[initialOne] ?? "",
            two[initialTwo] ?? "",
            three[initialThree] ?? ""
          )}`}
          data-size="large"
        >
          Tweet
        </a>
      </main>
    </>
  );
};

export default Home;
