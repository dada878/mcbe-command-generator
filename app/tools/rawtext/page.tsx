"use client";

import Editor from "@/components/editor";
import Command from "@/components/command";
import { useRef, useState } from "react";
import { generateJson } from "@/helpers/jsonGenerator";
import Preview from "@/components/preview";
import ActionBar from "@/components/actionBar";

export default function Page() {
  const [items, setItems] = useState<ItemList>([
    {
      id: "1",
      type: "translate",
      content: "Hello World",
      items: [
        {
          id: "11",
          type: "text",
          content: "Hello World",
        },
      ],
    },
  ]);

  const [commandType, setCommandType] = useState<string>("rawtext");

  const history = useRef<ItemList[]>([items]);
  const redoHistory = useRef<ItemList[]>([]);
  const json = generateJson(items);

  function recordHistory() {
    history.current.push(items);
    redoHistory.current = [];
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen mx-auto px-4">
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
    </div>
  );
}
