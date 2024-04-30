import { useSortable } from "@dnd-kit/sortable";
import TextItem from "./textItem";
import ScoreItem from "./scoreItem";
import { CSS } from "@dnd-kit/utilities";
import EntityItem from "./entityItem";
import { X } from "lucide-react";
import TranslateItem from "./translateItem";
import CreateItem from "./createItem";
import { useState } from "react";
import { cn } from "@/utils/cn";

export default function Item({
  item,
  onEditItem,
  onRemoveItem,
  isActive,
}: {
  item: AnyItem;
  onEditItem: (id: string, data: any) => void;
  onRemoveItem: (id: string) => void;
  isActive: boolean;
}) {
  const [disable, setDisable] = useState(item.type === "create");
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
      disabled: disable,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      style={style}
      className={cn(
        `bg-[#35353C] relative p-4 m-2 touch-none rounded-md`, 
        item.type === "translate" ? "" : "size-36",
        {
          "opacity-50": isActive,
        },
      )}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
    >
      {!disable && (
        <span
          data-on-dnd="true"
          onClick={() => {
            onRemoveItem(item.id);
          }}
        >
          <X className="absolute right-1 top-1 size-6 transition text-gray-400 hover:bg-[#45454e] p-1 rounded-full" />
        </span>
      )}
      <div className="flex flex-col gap-2">
      {generateItemComponent(item, onEditItem)}

      </div>

    </div>
  );
}

function generateItemComponent(
  item: AnyItem,
  onEditItem: (id: string, data: any) => void
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
