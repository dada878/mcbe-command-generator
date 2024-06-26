import Input from "../form/input";

export default function EntityItem({
  item,
  onEditItem,
}: {
  item: EntityItem;
  onEditItem: (id: number, data: any) => void;
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