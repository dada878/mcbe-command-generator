import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Column({
  items,
  onEditItem,
  onRemoveItem,
}: {
  items: ItemList;
  onEditItem: (id: string, data: any) => void;
  onRemoveItem: (id: string) => void;
}) {
  return (
    <div className="flex w-full">
      <SortableContext items={items} strategy={horizontalListSortingStrategy}>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onEditItem={onEditItem}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </SortableContext>
    </div>
  );
}

function TextItem({
  item,
  onEditItem,
}: {
  item: TextItem;
  onEditItem: (id: string, data: any) => void;
}) {
  return (
    <>
      <p>文字元件</p>
      <Input
        value={item.content}
        onChange={(value) => {
          onEditItem(item.id, { content: value });
        }}
      />
    </>
  );
}

function ScoreItem({
  item,
  onEditItem,
}: {
  item: ScoreItem;
  onEditItem: (id: string, data: any) => void;
}) {
  return (
    <>
      <p>分數元件</p>
      <Input
        value={item.entity}
        onChange={(value) => {
          onEditItem(item.id, { entity: value });
        }}
      />
      <Input
        value={item.scoreboard.toString()}
        onChange={(value) => {
          onEditItem(item.id, { scoreboard: value });
        }}
      />
    </>
  );
}

function EntityItem({
  item,
  onEditItem,
}: {
  item: EntityItem;
  onEditItem: (id: string, data: any) => void;
}) {
  return (
    <>
      <p>實體元件</p>
      <Input
        value={item.selector}
        onChange={(value) => {
          onEditItem(item.id, { selector: value });
        }}
      />
    </>
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
  }
}

function Item({
  item,
  onEditItem,
  onRemoveItem,
}: {
  item: AnyItem;
  onEditItem: (id: string, data: any) => void;
  onRemoveItem: (id: string) => void;
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
      className="bg-[#35353C] relative p-4 m-2 size-36 touch-none rounded-md flex flex-col gap-2"
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
        <X
          className="absolute right-1 top-1 size-6 transition text-gray-400 hover:bg-[#45454e] p-1 rounded-full"
        />
      </span>

      {generateItemComponent(item, onEditItem)}
    </div>
  );
}

function Input({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      className="bg-[#242429] rounded-md p-2 outline-none text-sm text-[#959595]"
      type="text"
      data-no-dnd="true"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}
