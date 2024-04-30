import { useSortable } from "@dnd-kit/sortable";
import TextItem from "./textItem";
import ScoreItem from "./scoreItem";
import { CSS } from "@dnd-kit/utilities";
import EntityItem from "./entityItem";
import { X } from "lucide-react";
import TranslateItem from "./translateItem";
import { useState } from "react";
import { cn } from "@/utils/cn";

export default function Item({
  item,
  onEditItem,
  onRemoveItem,
  isActive,
}: {
  item: AnyItem;
  onEditItem: (id: number, data: any) => void;
  onRemoveItem: (id: number) => void;
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

  return (
    <div
      style={style}
      id= "tour-step-2"
      className={cn(
        `bg-[#35353C] relative p-2 md:p-4 m-2 touch-none rounded-md`,
        item.type === "translate" ? "" : "h-30 w-28 md:size-36",
        {
          "opacity-50": isActive,
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
  }
}
