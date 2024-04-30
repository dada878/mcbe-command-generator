"use client";

import Editor from "@/components/editor";
import Command from "@/components/command";
import { useRef, useState } from "react";
import { generateJson } from "@/helpers/jsonGenerator";
import Preview from "@/components/preview";
import Select from "@/components/form/select";
import Button from "@/components/form/button";
import { FolderInput } from "lucide-react";
import Dialog from "@/components/dialog";
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
    <div className="flex flex-col gap-4 justify-center items-center h-screen container mx-auto">
      <ActionBar
        updateItems={setItems}
        commandType={commandType}
        setCommandType={setCommandType}
      />
      <Preview items={items} />
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
