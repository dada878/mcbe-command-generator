import { useSortable } from "@dnd-kit/sortable";
import TextItem from "./textItem";
import ScoreItem from "./scoreItem";
import { CSS } from "@dnd-kit/utilities";
import EntityItem from "./entityItem";
import { X } from "lucide-react";
import TranslateItem from "./translateItem";
import { useState } from "react";
import { cn } from "@/utils/cn";
import ControlItem from "./controlItem";
import SwitchItem from "./switchItem";

export default function Item({
  item,
  onEditItem,
  onDuplicateItem,
  onRemoveItem,
  isActive,
}: {
  item: AnyItem;
  onEditItem: (id: number, data: any) => void;
  onRemoveItem: (id: number) => void;
  onDuplicateItem: (id: number) => void;
  isActive: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isDynamicallySized =
    item.type === "translate" ||
    item.type === "control" ||
    item.type === "switch";

  return (
    <div
      style={style}
      id="tour-step-2"
      onDoubleClick={() => {
        onDuplicateItem(item.id);
      }}
      className={cn(
        `bg-[#35353C] relative p-2 md:p-4 m-2 touch-none rounded-md h-min select-none`,
        {
          "opacity-50": isActive,
          "h-30 w-28 md:size-36": !isDynamicallySized,
        }
      )}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
    >
      <span
        data-on-dnd="true"
        onClick={() => {
          onRemoveItem(item.id);
        }}
      >
        <X className="absolute right-1 top-1 md:size-6 size-4 transition text-gray-400 hover:bg-[#45454e] md:p-1 rounded-full" />
      </span>
      <div className="flex flex-col md:gap-2 gap-1">
        {generateItemComponent(item, onEditItem)}
      </div>
    </div>
  );
}

function generateItemComponent(
  item: AnyItem,
  onEditItem: (id: number, data: any) => void
) {
  switch (item.type) {
    case "text": {
      const textItem = item as TextItem;
      return TextItem({ item: textItem, onEditItem: onEditItem });
    }
    case "score": {
      const scoreItem = item as ScoreItem;
      return <ScoreItem item={scoreItem} onEditItem={onEditItem} />;
    }
    case "entity": {
      const entityItem = item as EntityItem;
      return <EntityItem item={entityItem} onEditItem={onEditItem} />;
    }
    case "translate": {
      const translateItem = item as TranslateItem;
      return TranslateItem({
        item: translateItem,
        onEditItem: onEditItem,
      });
    }
    case "control": {
      const controlItem = item as ControlItem;
      return <ControlItem item={controlItem} onEditItem={onEditItem} />;
    }
    case "switch": {
      const switchItem = item as SwitchItem;
      return <SwitchItem item={switchItem} onEditItem={onEditItem} />;
    }
  }
}
