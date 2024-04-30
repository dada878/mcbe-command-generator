import Input from "../form/input";

export default function TextItem({
  item,
  onEditItem,
}: {
  item: TextItem;
  onEditItem: (id: number, data: any) => void;
}) {
  return (
    <>
      <p className="md:text-base text-sm">文字元件</p>
      <Input
        value={item.content}
        onChange={(value) => {
          onEditItem(item.id, { content: value });
        }}
      />
    </>
  );
}

