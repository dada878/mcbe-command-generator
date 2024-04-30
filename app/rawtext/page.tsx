"use client";

import Editor from "@/components/editor";
import Command from "@/components/command";
import { useEffect, useRef, useState } from "react";
import { generateJson } from "@/helpers/jsonGenerator";
import Preview from "@/components/preview";
import ActionBar from "@/components/actionBar";
import useLocalStorage from "use-local-storage";
import Link from "next/link";

export default function Page() {
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
    <div className="py-4 md:py-0 min-h-screen flex w-screen">
      <div className="flex flex-col gap-4 justify-center items-center mx-auto px-4 w-full">
        <ActionBar
          updateItems={setItems}
          commandType={commandType}
          setCommandType={setCommandType}
        />
        <Preview command={JSON.stringify(json)} />
        <div className="flex w-full gap-4">
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
