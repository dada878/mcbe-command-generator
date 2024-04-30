"use client";

import Editor from "@/components/editor";
import Command from "@/components/command";
import { useRef, useState } from "react";
import { generateJson } from "@/helpers/jsonGenerator";
import Preview from "@/components/preview";
import UndoButton from "@/components/actions/undoButton";
import RedoButton from "@/components/actions/redoButton";

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

  const history = useRef<ItemList[]>([items]);
  const redoHistory = useRef<ItemList[]>([]);
  const json = generateJson(items);

  function recordHistory() {
    history.current.push(items);
    redoHistory.current = [];
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen container mx-auto">
      <div className="flex gap-4">
        <UndoButton
          items={items}
          setItems={setItems}
          history={history}
          redoHistory={redoHistory}
        />
        <RedoButton
          items={items}
          setItems={setItems}
          history={history}
          redoHistory={redoHistory}
        />
      </div>
      <Preview items={items} />
      <div className="flex w-full gap-4">
        <Editor
          items={items}
          setItems={setItems}
          recordHistory={recordHistory}
        />
      </div>
      <Command json={json} />
    </div>
  );
}
