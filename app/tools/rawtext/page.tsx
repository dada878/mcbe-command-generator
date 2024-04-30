"use client";

import Column from "@/components/column";
import Command from "@/components/command";
import { DndContext, closestCenter } from "@dnd-kit/core";
import useCustomSensors from "@/hooks/useCustomSensors";
import { arrayMove } from "@dnd-kit/sortable";
import { useRef, useState } from "react";
import { generateJson } from "@/helpers/jsonGenerator";
import Preview from "@/components/preview";
import { Undo, Redo } from "lucide-react";
import toast from "react-hot-toast";

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
    if (selectedType === "text") {
      setItems((items) => [
        ...items,
        { id: Date.now().toString(), type: "text", content: "Hello World" },
      ]);
    }
    if (selectedType === "score") {
      setItems((items) => [
        ...items,
        {
          id: Date.now().toString(),
          type: "score",
          entity: "@s",
          scoreboard: "score",
        },
      ]);
    }
    if (selectedType === "entity") {
      setItems((items) => [
        ...items,
        { id: Date.now().toString(), type: "entity", selector: "@s" },
      ]);
    }
    recordHistory();
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen container mx-auto">
      <div className="flex gap-4">
        <button
          className="bg-[#525355] text-white p-2 text-sm rounded-md"
          data-tooltip-id="tooltip"
          data-tooltip-content="復原"
          onClick={() => {
            if (history.current.length === 0) return;
            redoHistory.current.push(items);
            setItems(history.current[history.current.length - 1]);
            history.current.pop();
            toast.success("復原成功", {
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
              position: "bottom-right",
              duration: 2000,
            });
          }}
        >
          <Undo size="16" />
        </button>
        <button
          className="bg-[#525355] text-white p-2 text-sm rounded-md"
          data-tooltip-id="tooltip"
          data-tooltip-content="重做"
          onClick={() => {
            if (redoHistory.current.length === 0) return;
            history.current.push(items);
            setItems(redoHistory.current[redoHistory.current.length - 1]);
            redoHistory.current.pop();
            toast.success("重做成功", {
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
              position: "bottom-right",
              duration: 2000,
            });
          }}
          
        >
          <Redo size="16" />
        </button>
      </div>
      <Preview items={items} />
      <div className="flex w-full gap-4">
        <div className="flex flex-col gap-4 bg-[#27272C] rounded-md p-4">
          <div className="size-36 flex flex-col gap-3 justify-center">
            <h2 className="text-white text-center">添加元件</h2>
            <select
              className="w-full bg-[#35353c] text-sm text-white p-2 rounded-md outline-none cursor-pointer"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="text">文字元件</option>
              <option value="score">分數元件</option>
              <option value="entity">實體元件</option>
            </select>
            <button
              className="bg-[#525355] text-white p-2 text-sm rounded-md"
              onClick={handleAddItem}
            >
              添加
            </button>
          </div>
        </div>
        <div className="grow overflow-x-scroll bg-[#27272C] p-3 pb-0 rounded-md scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-[#35353C] scrollbar-track-[#27272C] scrollbar-track-rounded-full">
          <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
            sensors={sensors}
          >
            <Column
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
