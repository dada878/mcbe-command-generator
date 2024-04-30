let offset = 0;

export default function getNextId(items: ItemList): number {
  offset++;
  return items.reduce((acc, item) => {
    return item.type === "translate"
      ? Math.max(acc, getNextId((item as TranslateItem).items))
      : Math.max(acc, item.id);
  }, 0) + offset;
}