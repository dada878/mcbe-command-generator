"use client";

import Editor from "@/components/editor";
import Command from "@/components/command";
import { DndContext, closestCenter } from "@dnd-kit/core";
import useCustomSensors from "@/hooks/useCustomSensors";
import { arrayMove } from "@dnd-kit/sortable";
import { useRef, useState } from "react";
import { generateJson } from "@/helpers/jsonGenerator";
import Preview from "@/components/preview";
import UndoButton from "@/components/actions/undoButton";
import RedoButton from "@/components/actions/redoButton";
import CreateCard from "@/components/actions/createCard";

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
  const sensors = useCustomSensors();

  function recordHistory() {
    history.current.push(items);
    redoHistory.current = [];
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over) {
      return;
    }
    if (active.id !== over.id) {
      setItems((tasks) => {
        const oldIndex = tasks.findIndex((task) => task.id === active.id);
        const newIndex = tasks.findIndex((task) => task.id === over.id);
        return arrayMove(tasks, oldIndex, newIndex);
      });
      recordHistory();
    }
  }

  function handleEditItem(id: string, data: any) {
    setItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          return { ...item, ...data };
        }
        return item;
      })
    );
    recordHistory();
  }

  function handleRemoveItem(id: string) {
    console.log(id);
    setItems((items) => items.filter((item) => item.id !== id));
    recordHistory();
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
        <CreateCard
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          handleAddItem={handleAddItem}
        />
        <div className="grow overflow-x-scroll bg-[#27272C] p-3 pb-0 rounded-md scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-[#35353C] scrollbar-track-[#27272C] scrollbar-track-rounded-full">
          <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
            sensors={sensors}
          >
            <Editor
              items={items}
              onEditItem={handleEditItem}
              onRemoveItem={handleRemoveItem}
            />
          </DndContext>
        </div>
      </div>
      <Command json={json} />
    </div>
  );
}
