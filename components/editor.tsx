import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import Item from "./items/item";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import { useState } from "react";
import useCustomSensors from "@/hooks/useCustomSensors";
import CreateItem from "./items/createItem";
import { cn } from "@/utils/cn";
import getMaxId from "@/helpers/getNextId";
import getNextId from "@/helpers/getNextId";

export default function Editor({
  items,
  setItems,
  recordHistory,
  onChange,
  className,
  isNested,
  label,
}: {
  items: ItemList;
  setItems: (items: ItemList) => void;
  recordHistory: () => void;
  onChange?: (items: ItemList) => void;
  className?: string;
  isNested?: boolean;
  label?: string;
}) {
  const [activeId, setActiveId] = useState(null);
  const sensors = useCustomSensors();
  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }

  function handleDragEnd() {
    setActiveId(null);
  }

  function handleEditItem(id: number, data: any) {
    const nextItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, ...data };
      }
      return item;
    });
    setItems(nextItems);
    recordHistory();
    onChange && onChange(nextItems);
  }

  function handleRemoveItem(id: number) {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
    recordHistory();
    onChange && onChange(nextItems);
  }

  function handleDuplicateItem(id: number) {
    const itemIndex = items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      return;
    }
    const nextItems = [
      ...items.slice(0, itemIndex),
      { ...items[itemIndex], id: getNextId(items) + 1 },
      ...items.slice(itemIndex),
    ];
    setItems(nextItems);
    recordHistory();
    onChange && onChange(nextItems);
  }

  function handleAddItem(type: string) {
    let nextItems = items;
    switch (type) {
      case "text":
        nextItems = [
          ...items,
          {
            id: getNextId(items) + 1,
            type: "text",
            content: "Hello World",
          },
        ];
        break;
      case "score":
        nextItems = [
          ...items,
          {
            id: getNextId(items),
            type: "score",
            entity: "@s",
            scoreboard: "score",
          },
        ];
        break;
      case "entity":
        nextItems = [
          ...items,
          {
            id: getNextId(items),
            type: "entity",
            selector: "@s",
          },
        ];
        break;
      case "translate":
        nextItems = [
          ...items,
          {
            id: getNextId(items),
            type: "translate",
            content: "Hello World",
            items: [
              {
                id: getNextId(items) + 1,
                type: "text",
                content: "Hello World",
              },
            ],
          },
        ];
        break;
      case "control":
        nextItems = [
          ...items,
          {
            id: getNextId(items),
            type: "control",
            selector: "@s",
            if: [],
            else: [],
          },
        ];
        break;
      case "switch":
        nextItems = [
          ...items,
          {
            id: getNextId(items),
            type: "switch",
            cases: [
              {
                selector: "@s",
                items: [],
              },
            ],
          },
        ];
        break;
    }
    recordHistory();
    setItems(nextItems);
    onChange && onChange(nextItems);
  }

  function handleDargOver(event: any) {
    const { active, over } = event;
    if (!over) {
      return;
    }
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((task) => task.id === active.id);
      const newIndex = items.findIndex((task) => task.id === over.id);

      if (items.find((item) => item.id === over.id)?.type === "create") {
        return;
      }

      const nextItems = arrayMove(items, oldIndex, newIndex);

      setItems(nextItems);
      onChange && onChange(nextItems);
    }
  }

  return (
    <div
      className={cn(
        "grow bg-[#27272C] p-3 pb-0 rounded-md scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-[#35353C] scrollbar-track-[#27272C] scrollbar-track-rounded-full",
        className,
        {
          "p-1 pb-1": isNested,
          "overflow-x-scroll py-16 md:pt-3 md:pb-0 container": !isNested,
        }
      )}
      {...(!isNested && { id: "tour-step-1" })}
    >
      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDargOver}
        sensors={sensors}
      >
        {label && <p className="ml-2 mt-2 text-[#959595] text-sm">{label}</p>}
        <div className="flex w-full h-full">
          <SortableContext
            items={items}
            strategy={horizontalListSortingStrategy}
          >
            {items.map((item) => (
              <Item
                onDuplicateItem={handleDuplicateItem}
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
                onDuplicateItem={handleDuplicateItem}
                item={items.find((item) => item.id === activeId)!}
                onEditItem={handleEditItem}
                onRemoveItem={handleRemoveItem}
                isActive={false}
              />
            ) : null}
          </DragOverlay>
          <div
            {...(!isNested && { id: "tour-step-3" })}
            className={`bg-[#35353C] relative min-w-30 md:min-w-36 h-30 md:h-36 p-4 m-2 touch-none rounded-md flex flex-col gap-2`}
          >
            <CreateItem handleAddItem={handleAddItem} />
          </div>
        </div>
      </DndContext>
    </div>
  );
}
