import Input from "../form/input";

export default function TextItem({
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

