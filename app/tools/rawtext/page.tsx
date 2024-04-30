"use client";

import Editor from "@/components/editor";
import { DragOverlay } from "@dnd-kit/core";
import Command from "@/components/command";
import { DndContext, closestCenter } from "@dnd-kit/core";
import useCustomSensors from "@/hooks/useCustomSensors";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useRef, useState } from "react";
import { generateJson } from "@/helpers/jsonGenerator";
import Preview from "@/components/preview";
import UndoButton from "@/components/actions/undoButton";
import RedoButton from "@/components/actions/redoButton";
import CreateCard from "@/components/actions/createCard";
import Item from "@/components/items/item";

export default function Page() {
  const [items, setItems] = useState<ItemList>([
    { id: "1", type: "text", content: "Hello World" },
    { id: "2", type: "score", entity: "@s", scoreboard: "score" },
    { id: "3", type: "entity", selector: "@s" },
  ]);

  const history = useRef<ItemList[]>([items]);
  const redoHistory = useRef<ItemList[]>([]);

  const [selectedType, setSelectedType] = useState<string>("text");

  const json = generateJson(items);

  function recordHistory() {
    history.current.push(items);
    redoHistory.current = [];
  }

  function handleAddItem() {
    switch (selectedType) {
      case "text":
        setItems((items) => [
          ...items,
          { id: Date.now().toString(), type: "text", content: "Hello World" },
        ]);
        break;
      case "score":
        setItems((items) => [
          ...items,
          {
            id: Date.now().toString(),
            type: "score",
            entity: "@s",
            scoreboard: "score",
          },
        ]);
        break;
      case "entity":
        setItems((items) => [
          ...items,
          { id: Date.now().toString(), type: "entity", selector: "@s" },
        ]);
        break;
    }
    recordHistory();
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
