"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type AnimalId =
  | "capybara"
  | "cat"
  | "owl"
  | "snowLeopard"
  | "seaOtter"
  | "retriever"
  | "elephant"
  | "lion";

type Animal = {
  id: AnimalId;
  name: string;
  englishName: string;
  tags: string[];
  summary: string;
  detail: string;
  image: string;
};

type Option = {
  text: string;
  animal: AnimalId;
};

type Question = {
  prompt: string;
  options: Option[];
};

const animals: Animal[] = [
  {
    id: "capybara",
    name: "水豚",
    englishName: "Capybara",
    tags: ["佛系", "和平天使"],
    summary: "世界紛擾擾，但我內心平靜。你是大家的情緒穩定劑",
    detail: "你不急著搶鏡頭，卻能讓場面自然降溫。越混亂的時候，越看得出你的珍貴。",
    image: "/images/Capybara.png",
  },
  {
    id: "cat",
    name: "傲嬌貓",
    englishName: "Cat",
    tags: ["高冷"],
    summary: "我只是需要你，擁有優雅的美感與節奏。",
    detail: "你有自己的節拍和審美，不喜歡被催促。熟了之後才會發現，你的在乎其實很細膩。",
    image: "/images/Cat.png",
  },
  {
    id: "owl",
    name: "貓頭鷹",
    englishName: "Owl",
    tags: ["觀察者", "智慧型"],
    summary: "總是在高處默默洞察一切，不輕易發言，但一開口就是重點。",
    detail: "你習慣先看懂局勢再行動，少說廢話。大家需要判斷時，通常會回頭找你確認方向。",
    image: "/images/Owl.png",
  },
  {
    id: "snowLeopard",
    name: "雪豹",
    englishName: "Snow Leopard",
    tags: ["獨行俠", "高效率"],
    summary: "喜歡獨立作業，精準、優雅且致命（在工作上）。",
    detail: "你偏好安靜而高品質的輸出，不愛多餘會議。目標清楚時，你的推進速度非常驚人。",
    image: "/images/Snow%20Leopard.png",
  },
  {
    id: "seaOtter",
    name: "海獺",
    englishName: "Sea Otter",
    tags: ["氣氛組", "手牽手"],
    summary: "最喜歡跟大家黏在一起，雖然偶爾會迷糊，但大家都愛你。",
    detail: "你讓關係變得柔軟，也讓平凡日常多一點可愛。就算忘東忘西，大家還是想把你帶上。",
    image: "/images/Otter.png",
  },
  {
    id: "retriever",
    name: "黃金獵犬",
    englishName: "Retriever",
    tags: ["熱情怪", "行動派"],
    summary: "永遠充滿電！想到什麼就立刻去做，你總是自帶光。",
    detail: "你是把想法變成現場的人，能快速感染身邊的人。你的能量很亮，也很適合打開僵局。",
    image: "/images/Retriever.png",
  },
  {
    id: "elephant",
    name: "大象",
    englishName: "Elephant",
    tags: ["守護者", "穩重"],
    summary: "國際裡最可靠的靠山，走得慢但是很遠，記憶力驚人。",
    detail: "你重視承諾和長期穩定，不會輕易丟下任何人。你的可靠，是大家敢放心前進的原因。",
    image: "/images/Elephant.png",
  },
  {
    id: "lion",
    name: "獅子",
    englishName: "Lion",
    tags: ["王者", "控制狂"],
    summary: "天生的領袖，目標明確，不容許失誤，帶領大家往前衝。",
    detail: "你不害怕站到前面，也願意替結果負責。當方向混亂時，你會直接把旗子插下去。",
    image: "/images/Lion.png",
  },
];

const questions: Question[] = [
  {
    prompt: "週一早上的你通常是？",
    options: [
      { text: "先泡杯飲料，讓靈魂慢慢回到身體", animal: "capybara" },
      { text: "看心情回訊息，保持一點神祕距離", animal: "cat" },
      { text: "先掃過行程，抓出今天真正重要的事", animal: "owl" },
      { text: "戴上耳機，直接進入高專注模式", animal: "snowLeopard" },
      { text: "找同事聊兩句，確認大家都還活著", animal: "seaOtter" },
      { text: "一到就開工，能做的先做起來", animal: "retriever" },
      { text: "整理待辦，確認每個人不會漏掉重點", animal: "elephant" },
      { text: "訂出本週目標，先把方向拉正", animal: "lion" },
    ],
  },
  {
    prompt: "團隊討論卡住時，你會？",
    options: [
      { text: "先讓大家冷靜一下，別急著互相說服", animal: "capybara" },
      { text: "指出哪裡不夠漂亮或不夠順", animal: "cat" },
      { text: "把問題拆開，找出真正的卡點", animal: "owl" },
      { text: "安靜做一版可行方案給大家看", animal: "snowLeopard" },
      { text: "講個小笑話，讓氣氛不要太硬", animal: "seaOtter" },
      { text: "提議先試一個版本，不要停在原地", animal: "retriever" },
      { text: "整理每個人的顧慮，讓大家都被聽見", animal: "elephant" },
      { text: "直接決定方向，帶大家往下一步走", animal: "lion" },
    ],
  },
  {
    prompt: "朋友臨時揪一個活動，你的反應是？",
    options: [
      { text: "可以啊，輕鬆就好，不要太趕", animal: "capybara" },
      { text: "看地點和穿搭值不值得我出門", animal: "cat" },
      { text: "先問清楚時間、費用和流程", animal: "owl" },
      { text: "如果不影響原本計畫，我可以獨自前往", animal: "snowLeopard" },
      { text: "有大家就好，我跟，我怕錯過聊天", animal: "seaOtter" },
      { text: "走啊！現在嗎？我已經準備好了", animal: "retriever" },
      { text: "我來確認交通和誰需要被接送", animal: "elephant" },
      { text: "可以，我順便安排集合方式", animal: "lion" },
    ],
  },
  {
    prompt: "面對壓力時，你最常？",
    options: [
      { text: "放慢呼吸，先穩住情緒再說", animal: "capybara" },
      { text: "保持體面，私下再消化不爽", animal: "cat" },
      { text: "分析壓力來源，找出最有效的解法", animal: "owl" },
      { text: "切掉干擾，一個人把事情完成", animal: "snowLeopard" },
      { text: "找信任的人黏一下，充電再回來", animal: "seaOtter" },
      { text: "動起來，做了就比較不焦慮", animal: "retriever" },
      { text: "先扛住，確保身邊的人不被波及", animal: "elephant" },
      { text: "把控制權拿回來，重新排優先順序", animal: "lion" },
    ],
  },
  {
    prompt: "你最喜歡的工作節奏是？",
    options: [
      { text: "穩穩做，不內耗，不硬衝", animal: "capybara" },
      { text: "要有美感和品質，不能只是完成", animal: "cat" },
      { text: "先理解全局，再精準下手", animal: "owl" },
      { text: "明確目標、少點打擾、快速交付", animal: "snowLeopard" },
      { text: "有人一起做最好，邊做邊互相補位", animal: "seaOtter" },
      { text: "短衝刺、快回饋、越做越有電", animal: "retriever" },
      { text: "按部就班，確保每個環節都可靠", animal: "elephant" },
      { text: "目標清楚，權責清楚，直接攻頂", animal: "lion" },
    ],
  },
  {
    prompt: "如果要規劃一趟旅行，你會負責？",
    options: [
      { text: "找舒服的休息點，行程不要太滿", animal: "capybara" },
      { text: "挑有質感的咖啡廳和拍照角落", animal: "cat" },
      { text: "研究評價、路線和隱藏版景點", animal: "owl" },
      { text: "規劃最高效率的移動方式", animal: "snowLeopard" },
      { text: "確認大家晚上可以聚在一起聊天", animal: "seaOtter" },
      { text: "揪活動、訂體驗、把氣氛炒起來", animal: "retriever" },
      { text: "準備備案、藥品和重要文件", animal: "elephant" },
      { text: "統整所有決策，讓行程順利推進", animal: "lion" },
    ],
  },
  {
    prompt: "別人對你的第一印象比較像？",
    options: [
      { text: "很舒服，跟你相處沒有壓力", animal: "capybara" },
      { text: "有距離感，但很有風格", animal: "cat" },
      { text: "安靜聰明，好像什麼都看得出來", animal: "owl" },
      { text: "俐落獨立，不太需要別人操心", animal: "snowLeopard" },
      { text: "親切可愛，很容易讓人想靠近", animal: "seaOtter" },
      { text: "陽光熱情，出現就很有存在感", animal: "retriever" },
      { text: "穩重可靠，可以放心交給你", animal: "elephant" },
      { text: "氣場很強，像是知道自己要去哪", animal: "lion" },
    ],
  },
  {
    prompt: "你心中理想的一天是？",
    options: [
      { text: "睡飽、吃好、慢慢過，世界不要吵我", animal: "capybara" },
      { text: "穿得好看，去喜歡的地方做喜歡的事", animal: "cat" },
      { text: "讀到有趣的東西，腦袋被點亮", animal: "owl" },
      { text: "完成一件困難的事，沒有人打擾", animal: "snowLeopard" },
      { text: "和喜歡的人待在一起，做什麼都可以", animal: "seaOtter" },
      { text: "滿滿活動，晚上還覺得今天超值得", animal: "retriever" },
      { text: "把重要的人照顧好，事情也都穩穩落地", animal: "elephant" },
      { text: "達成目標，掌握節奏，所有人一起前進", animal: "lion" },
    ],
  },
];

const animalOrder = animals.map((animal) => animal.id);

function getResult(answers: Option[]) {
  const scores = Object.fromEntries(
    animalOrder.map((animal) => [animal, 0]),
  ) as Record<AnimalId, number>;

  answers.forEach((answer) => {
    scores[answer.animal] += 1;
  });

  const highestScore = Math.max(...Object.values(scores));
  const tiedAnimals = animalOrder.filter((animal) => scores[animal] === highestScore);
  const answerSeed = answers.reduce((total, answer, index) => {
    const animalIndex = animalOrder.indexOf(answer.animal);
    return total + (animalIndex + 1) * (index + 3);
  }, 0);
  const winnerId = tiedAnimals[answerSeed % tiedAnimals.length];

  return animals.find((animal) => animal.id === winnerId) ?? animals[0];
}

export default function Home() {
  const [step, setStep] = useState<"intro" | "quiz" | "result">("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const question = questions[currentQuestion];
  const result = useMemo(
    () => (answers.length === questions.length ? getResult(answers) : null),
    [answers],
  );
  const answeredCount =
    step === "result" ? questions.length : currentQuestion + (selectedOption === null ? 0 : 1);
  const progress = Math.round((answeredCount / questions.length) * 100);

  function startQuiz() {
    setStep("quiz");
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedOption(null);
  }

  function goNext() {
    if (selectedOption === null) {
      return;
    }

    const nextAnswers = [...answers, question.options[selectedOption]];

    if (currentQuestion === questions.length - 1) {
      setAnswers(nextAnswers);
      setStep("result");
      setSelectedOption(null);
      return;
    }

    setAnswers(nextAnswers);
    setCurrentQuestion((current) => current + 1);
    setSelectedOption(null);
  }

  function goBack() {
    if (currentQuestion === 0) {
      setStep("intro");
      setAnswers([]);
      setSelectedOption(null);
      return;
    }

    const previousAnswers = answers.slice(0, -1);
    const previousAnswer = answers[answers.length - 1];
    const previousQuestionIndex = currentQuestion - 1;
    const previousSelectedOption = questions[previousQuestionIndex].options.findIndex(
      (option) => option.text === previousAnswer.text,
    );

    setAnswers(previousAnswers);
    setCurrentQuestion(previousQuestionIndex);
    setSelectedOption(previousSelectedOption >= 0 ? previousSelectedOption : null);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf7ef] text-[#1d2433]">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between gap-4 py-3">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-[#d05a36] uppercase">
              Animal Persona Quiz
            </p>
            <p className="mt-1 text-lg font-black text-[#1d2433]">動物型不型</p>
          </div>
          <div className="rounded-full border border-[#1d2433]/10 bg-white/70 px-4 py-2 text-sm font-bold text-[#405064] shadow-sm">
            8 種動物人格
          </div>
        </header>

        {step === "intro" && (
          <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-[#dff0ea] px-4 py-2 text-sm font-bold text-[#176c5f]">
                一題一步，測出你的動物人格
              </p>
              <h1 className="max-w-3xl text-5xl font-black leading-[1.05] text-[#1d2433] sm:text-6xl lg:text-7xl">
                你今天比較像哪一種動物？
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#556273]">
                回答 8 個直覺情境題，最後取得你的動物類型。題目沒有標準答案，只要選最像你的反應。
              </p>
              <button
                className="mt-8 inline-flex min-h-14 items-center justify-center rounded-full bg-[#1d2433] px-8 text-base font-black text-white shadow-lg shadow-[#1d2433]/20 transition hover:-translate-y-0.5 hover:bg-[#2e3a4f] focus:outline-none focus:ring-4 focus:ring-[#d05a36]/25"
                type="button"
                onClick={startQuiz}
              >
                開始測驗
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {animals.map((animal) => (
                <div
                  className="rounded-lg border border-[#1d2433]/10 bg-white/80 p-4 shadow-sm"
                  key={animal.id}
                >
                  <p className="text-base font-black text-[#1d2433]">{animal.name}</p>
                  <p className="mt-1 text-sm font-semibold text-[#6a7484]">
                    #{animal.tags.join(" #")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === "quiz" && (
          <div className="flex flex-1 items-center py-8">
            <div className="w-full rounded-lg border border-[#1d2433]/10 bg-white p-5 shadow-xl shadow-[#1d2433]/10 sm:p-8 lg:p-10">
              <div className="mb-8">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-black text-[#d05a36]">
                    第 {currentQuestion + 1} 題 / 共 {questions.length} 題
                  </p>
                  <p className="text-sm font-bold text-[#6a7484]">{progress}%</p>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#e9edf1]">
                  <div
                    className="h-full rounded-full bg-[#d05a36] transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <h2 className="text-3xl font-black leading-tight text-[#1d2433] sm:text-4xl">
                {question.prompt}
              </h2>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {question.options.map((option, index) => {
                  const isSelected = selectedOption === index;

                  return (
                    <button
                      className={`min-h-20 rounded-lg border p-4 text-left text-base font-bold leading-6 transition focus:outline-none focus:ring-4 focus:ring-[#d05a36]/20 ${
                        isSelected
                          ? "border-[#d05a36] bg-[#fff0e8] text-[#1d2433] shadow-md"
                          : "border-[#1d2433]/10 bg-[#f9faf7] text-[#405064] hover:border-[#d05a36]/45 hover:bg-white"
                      }`}
                      key={option.text}
                      type="button"
                      onClick={() => setSelectedOption(index)}
                    >
                      {option.text}
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <button
                  className="min-h-12 rounded-full border border-[#1d2433]/15 px-6 text-base font-black text-[#405064] transition hover:bg-[#f3f5f1] focus:outline-none focus:ring-4 focus:ring-[#1d2433]/10"
                  type="button"
                  onClick={goBack}
                >
                  上一步
                </button>
                <button
                  className="min-h-12 rounded-full bg-[#1d2433] px-7 text-base font-black text-white shadow-lg shadow-[#1d2433]/15 transition hover:bg-[#2e3a4f] focus:outline-none focus:ring-4 focus:ring-[#d05a36]/25 disabled:cursor-not-allowed disabled:bg-[#aeb5bf] disabled:shadow-none"
                  type="button"
                  onClick={goNext}
                  disabled={selectedOption === null}
                >
                  {currentQuestion === questions.length - 1 ? "送出結果" : "下一題"}
                </button>
              </div>
            </div>
          </div>
        )}

        {step === "result" && result && (
          <div className="flex flex-1 items-center py-8">
            <div className="grid w-full items-center gap-8 rounded-lg border border-[#1d2433]/10 bg-white p-5 shadow-xl shadow-[#1d2433]/10 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
              <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-lg bg-[#e7f0ed]">
                <Image
                  className="object-cover"
                  src={result.image}
                  alt={`${result.name} personality result`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 380px"
                  priority
                />
              </div>

              <div>
                <p className="text-sm font-black tracking-[0.18em] text-[#d05a36] uppercase">
                  Your Animal Type
                </p>
                <h2 className="mt-3 text-5xl font-black leading-tight text-[#1d2433] sm:text-6xl">
                  {result.name}
                </h2>
                <p className="mt-2 text-xl font-bold text-[#556273]">{result.englishName}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {result.tags.map((tag) => (
                    <span
                      className="rounded-full bg-[#dff0ea] px-4 py-2 text-sm font-black text-[#176c5f]"
                      key={tag}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <p className="mt-6 text-2xl font-black leading-9 text-[#1d2433]">
                  {result.summary}
                </p>
                <p className="mt-4 text-lg leading-8 text-[#556273]">{result.detail}</p>
                <button
                  className="mt-8 min-h-12 rounded-full bg-[#1d2433] px-7 text-base font-black text-white shadow-lg shadow-[#1d2433]/15 transition hover:bg-[#2e3a4f] focus:outline-none focus:ring-4 focus:ring-[#d05a36]/25"
                  type="button"
                  onClick={startQuiz}
                >
                  重新測驗
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
