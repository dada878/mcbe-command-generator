import Input from "../form/input";
import Editor from "../editor";

export default function TranslateItem({
  item,
  onEditItem,
}: {
  item: TranslateItem;
  onEditItem: (id: string, data: any) => void;
}) {
  return (
    <>
      <p>翻譯元件</p>
      <Input
        value={item.content}
        onChange={(value) => {
          onEditItem(item.id, { content: value });
        }}
      />

      <Editor
        items={item.items}
        setItems={(items) => {
          onEditItem(item.id, { items });
        }}
        recordHistory={() => {}}
        onChange={(items) => {
          onEditItem(item.id, { items });
        }}
        isNested
      />
    </>
  );
}
