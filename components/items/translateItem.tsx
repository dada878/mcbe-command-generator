import { CSS } from "@dnd-kit/utilities";
import { arrayMove, useSortable } from "@dnd-kit/sortable";
import TextItem from "./textItem";
import ScoreItem from "./scoreItem";
import EntityItem from "./entityItem";
import { X } from "lucide-react";
import Input from "../input";
import Editor from "../editor";
import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import useCustomSensors from "@/hooks/useCustomSensors";

export default function TranslateItem({ item }: { item: TranslateItem }) {
  function handleEditItem(id: string, data: any) {
    console.log("Edit", id, data);
  }

  function handleRemoveItem(id: string) {
    console.log("Remove", id);
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
    }
  }

  const sensors = useCustomSensors();
  
  const [items, setItems] = useState<ItemList>([
    {
      id: "11",
      type: "text",
      content: "Hello World",
    },
    {
      id: "12",
      type: "score",
      entity: "@s",
      scoreboard: "score",
    },
    {
      id: "13",
      type: "entity",
      selector: "@s",
    },
  ]);

  return (
    <>
      <p>翻譯元件</p>
      <div className="grow overflow-x-scroll bg-[#27272C] p-3 pb-0 rounded-md scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-[#35353C] scrollbar-track-[#27272C] scrollbar-track-rounded-full">
          <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
            sensors={sensors}
          >
            <Editor
              items={items}
              setItems={setItems}
              recordHistory={() => {}}
            />
          </DndContext>
        </div>
    </>
  );
}
