"use client";

import Editor from "@/components/editor";
import Command from "@/components/command";
import { useEffect, useRef, useState } from "react";
import { generateJson } from "@/helpers/jsonGenerator";
import Preview from "@/components/preview";
import ActionBar from "@/components/actionBar";
import useLocalStorage from "use-local-storage";
import Link from "next/link";
import { TourProvider } from "@reactour/tour";
import Button from "@/components/form/button";

export default function RawtextPage() {
  const radius = 10;
  return (
    <TourProvider
      prevButton={({
        currentStep,
        stepsLength,
        setIsOpen,
        setCurrentStep,
        steps,
      }) => {
        const first = currentStep === 0;
        return (
          <Button
            className="bg-[#51515b] text-white"
            onClick={() => {
              if (first) {
                setIsOpen(false);
              } else {
                setCurrentStep((s) => (s === 0 ? steps!.length - 1 : s - 1));
              }
            }}
          >
            {first ? "關閉" : "上一步"}
          </Button>
        );
      }}
      nextButton={({
        currentStep,
        stepsLength,
        setIsOpen,
        setCurrentStep,
        steps,
      }) => {
        const last = currentStep === stepsLength - 1;
        return (
          <Button
            className="bg-[#51515b] text-white"
            onClick={() => {
              if (last) {
                setIsOpen(false);
              } else {
                setCurrentStep((s) => (s === steps!.length - 1 ? 0 : s + 1));
              }
            }}
          >
            {last ? "完成" : "下一步"}
          </Button>
        );
      }}
      steps={steps}
      styles={{
        popover: (base) => ({
          ...base,
          backgroundColor: "#3e3e46",
          "--reactour-accent": "#ffffff",
          borderRadius: radius,
        }),
        maskArea: (base) => ({ ...base, rx: radius }),
        maskWrapper: (base) => ({ ...base, color: "#0000008f" }),
        badge: (base) => ({ ...base, display: "none" }),
        controls: (base) => ({ ...base, marginTop: 100 }),
        close: (base) => ({
          ...base,
          right: "auto",
          left: 8,
          top: 8,
          display: "none",
        }),
      }}
    >
      <Page />
    </TourProvider>
  );
}

function Page() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const [items, setItems] = useLocalStorage<ItemList>(
    "rawtext-items",
    [
      {
        id: 1,
        type: "text",
        content: "這是一段文字",
      },
    ],
    {
      serializer: (obj) => {
        return JSON.stringify(obj);
      },
      parser: (str) => {
        return JSON.parse(str);
      },
      syncData: true,
    }
  );

  const [commandType, setCommandType] = useState<string>("rawtext");

  const history = useRef<ItemList[]>([items]);
  const redoHistory = useRef<ItemList[]>([]);
  const json = generateJson(items);

  if (!hasMounted) {
    return null;
  }

  function recordHistory() {
    history.current.push(items);
    redoHistory.current = [];
  }

  return (
    <div className="py-4 md:py-0 min-h-screen overflow-x-hidden flex min-w-screen">
      <div className="flex flex-col gap-4 py-12 justify-center items-center mx-auto px-4 w-full">
        <ActionBar
          updateItems={setItems}
          commandType={commandType}
          setCommandType={setCommandType}
        />
        <Preview command={JSON.stringify(json)} />
        <div className="flex w-full gap-4 justify-center items-center">
          <Editor
            items={items}
            setItems={setItems}
            recordHistory={recordHistory}
          />
        </div>
        <Command commandType={commandType} json={json} />
        <p className="text-[#8c8c8c]">
          開發者：
          <Link className="underline" href={"https://dada878.com"}>
            冰川
          </Link>
        </p>
      </div>
    </div>
  );
}

const steps = [
  {
    selector: "#tour-step-1",
    content: "這裡是編輯區塊。在這裡，你可以修改元件中的輸入框內容，並且可以拖曳元件來調整順序，或者點擊右上角的叉叉來刪除元件。",
  },
  {
    selector: "#tour-step-3",
    content: "如果需要添加更多元件，點擊這個按鈕即可創建新元件。",
  },
  {
    selector: "#tour-step-4",
    content: "在編輯區塊修改元件後，你可以在預覽區查看效果。",
  },
  {
    selector: "#tour-step-5",
    content: "你可以在這裡看到生成的指令，點擊右下角的複製按鈕即可將指令複製到剪貼簿。",
  },
  {
    selector: "#tour-step-6",
    content: "這裡有一些有用的操作按鈕，包括載入指令、清除所有元件、套用模板，或查看使用教學。",
  },
];

