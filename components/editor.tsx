import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import Item from "./items/item";

export default function Editor({
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

