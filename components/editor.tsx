import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import Item from "./items/item";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import { useState } from "react";
import useCustomSensors from "@/hooks/useCustomSensors";

export default function Editor({
  items,
  setItems,
  recordHistory,
} : {
  items: ItemList;
  setItems: (items: ItemList) => void 
  recordHistory: () => void;
}) {
  const [activeId, setActiveId] = useState(null);
  const sensors = useCustomSensors();
  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }

  function handleDragEnd() {
    setActiveId(null);
  }

  function handleEditItem(id: string, data: any) {
    setItems(
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
    setItems(items.filter((item) => item.id !== id));
    recordHistory();
  }

  function handleDargOver(event: any) {
    const { active, over } = event;
    if (!over) {
      return;
    }
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((task) => task.id === active.id);
      const newIndex = items.findIndex((task) => task.id === over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  }

  return (
    <div className="grow overflow-x-scroll bg-[#27272C] p-3 pb-0 rounded-md scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-[#35353C] scrollbar-track-[#27272C] scrollbar-track-rounded-full">
          <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragOver={handleDargOver}
            sensors={sensors}
          >
            <div className="flex w-full h-full">
              <SortableContext
                items={items}
                strategy={horizontalListSortingStrategy}
              >
                {items.map((item) => (
                  <Item
                    key={item.id}
                    item={item}
                    onEditItem={handleEditItem}
                    onRemoveItem={handleRemoveItem}
                    isActive={activeId === item.id}
                  />
                ))}
              </SortableContext>
              <DragOverlay>
                {activeId && items.find((item) => item.id === activeId) ? (
                  <Item
                    item={items.find((item) => item.id === activeId)!}
                    onEditItem={handleEditItem}
                    onRemoveItem={handleRemoveItem}
                    isActive={false}
                  />
                ) : null}
              </DragOverlay>
            </div>
          </DndContext>
        </div>
  );
}
