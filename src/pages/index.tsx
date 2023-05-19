"use client";

import { type NextPage } from "next";
import { Button } from "@nextui-org/react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import SpinnablePicker from "~/componenets/picker";
import CopyIcon from "../../public/copy.png";

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
];
// bg-black/10 p-1 text-black hover:bg-black/20
// bg-black/10 p-1 text-black hover:bg-black/20

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const Home: NextPage = () => {
  const [initialOne, setInitialOne] = useState(2);
  const [selectedOne, setSelectedOne] = useState(one[initialOne]);

  const [initialTwo, setInitialTwo] = useState(4);
  const [selectedTwo, setSelectedTwo] = useState(two[initialTwo]);

  const [initialThree, setInitialThree] = useState(5);
  const [selectedThree, setSelectedThree] = useState(three[initialThree]);

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
        <meta name="description" content="Не называй патриотами кровопийц" />
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
          <h3 className="text-center text-2xl font-bold">{`${selectedOne}`}</h3>
          <h3 className="text-center text-2xl font-bold">{`${selectedTwo} ${selectedThree}`}</h3>
          <div className="flex flex-row justify-center">
            <button
              className="d-flex rounded border-2 border-black"
              onClick={() => {
                bound(setInitialOne, one)(getRandomInt(one.length));
                bound(setInitialTwo, two)(getRandomInt(two.length));
                bound(setInitialThree, three)(getRandomInt(three.length));
              }}
            >
              <img
                className="w-7 rounded  bg-black/0 p-1 text-black visited:bg-black/20 hover:bg-black/10 active:bg-black/20"
                src="/rotate2.png"
                alt="Наугад"
              />
            </button>
            <button
              className="d-flex ml-5 rounded border-2 border-black"
              onClick={() =>
                navigator.clipboard.writeText(
                  `${selectedOne} ${selectedTwo} ${selectedThree}`
                )
              }
            >
              <img
                className="w-7 rounded bg-black/0 p-1 text-black visited:bg-black/40 hover:bg-black/20 active:bg-black/50"
                src="/copy.png"
                alt="Copy"
              />
            </button>
          </div>
        </div>
        <br></br>
        <div className="flex">
          <SpinnablePicker
            options={one}
            initialIndex={initialOne}
            setInitialIndex={(n: number) => bound(setInitialOne, one)(n)}
            indexChanged={(n) => setSelectedOne(one[n])}
          />
          <SpinnablePicker
            options={two}
            initialIndex={initialTwo}
            setInitialIndex={(n: number) => bound(setInitialTwo, one)(n)}
            indexChanged={(n) => setSelectedTwo(two[n])}
          />
          <SpinnablePicker
            options={three}
            initialIndex={initialThree}
            setInitialIndex={(n: number) => bound(setInitialThree, one)(n)}
            indexChanged={(n) => setSelectedThree(three[n])}
          />
        </div>
      </main>
    </>
  );
};

export default Home;
