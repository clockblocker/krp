"use client";

import { type NextPage } from "next";
import { Button } from "@nextui-org/react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import SpinnablePicker from "~/componenets/picker";
import CopyIcon from "../../public/copy.png";

const one = [
  "Группа",
  "Отряд",
  "Сборище",
  "Кучка",
  "Горстка",
  "Кооператив",
  "Артель",
];

const two = [
  "анонимных",
  "отборных",
  "конченых",
  "отбитых",
  "мамкиных",
  "подвальных",
  "отстваных",
  "диванных",
];

const three = [
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
];
// bg-black/10 p-1 text-black hover:bg-black/20
// bg-black/10 p-1 text-black hover:bg-black/20
// bg-black/10 p-1 text-black hover:bg-black/20
const Home: NextPage = () => {
  const [initialOne, setInitialOne] = useState(0);
  const [selectedOne, setSelectedOne] = useState(one[initialOne]);

  const [initialTwo, setInitialTwo] = useState(0);
  const [selectedTwo, setSelectedTwo] = useState(two[initialTwo]);

  const [initialThree, setInitialThree] = useState(0);
  const [selectedThree, setSelectedThree] = useState(three[initialThree]);
  // min-h-screen 
  return (
    <>
      <Head>
        <title>КРП здорового человека</title>
        <meta name="description" content="Не называй патриотами кровопийц" />
        <link rel="icon" href="/trans_str.png" />
      </Head>

      <main className="flex flex-col items-center justify-center bg-gradient-to-b from-[#9d9ef9] to-[#ffffff]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-8 ">
          <h1 className="select-none text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Не называй{" "}
            <span className="select-none text-[hsl(219,41%,42%)]">
              патриотами{" "}
            </span>
            <span className="select-none text-[hsl(349,61%,50%)]">
              кровопийц{" "}
            </span>
          </h1>
          <div className="flex flex-row">
            <h3 className="text-2xl font-bold">{`${selectedOne} ${selectedTwo} ${selectedThree}`}</h3>
            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  `${selectedOne} ${selectedTwo} ${selectedThree}`
                )
              }
            >
              <img className="ml-5 w-10" src="/copy.png" alt="Copy" />
            </button>
            {/* <div className="btn btn_red">
              <span className="icon"></span>
              <img src={"../../public/copy.png"} alt="Скопировать"></img>
              <span></span>
            </div> */}
          </div>
        </div>
        <div className="flex">
          <SpinnablePicker
            options={one}
            indexChanged={(n) => setSelectedOne(one[n])}
          />
          <SpinnablePicker
            options={two}
            indexChanged={(n) => setSelectedTwo(two[n])}
          />
          <SpinnablePicker
            options={three}
            indexChanged={(n) => setSelectedThree(three[n])}
          />
        </div>
      </main>
    </>
  );
};

export default Home;
