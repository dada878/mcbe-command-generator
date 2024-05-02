import Editor from "../editor";
import Input from "../form/input";

export default function ControlItem({
  item,
  onEditItem,
}: {
  item: ControlItem;
  onEditItem: (id: number, data: any) => void;
}) {
  return (
    <>
      <p className="md:text-base text-sm">判斷元件</p>
      <Input
        value={item.selector}
        onChange={(value) => {
          onEditItem(item.id, { selector: value });
        }}
      />
      <div className="flex gap-3">
        <Editor
          label="如果"
          items={item.if}
          setItems={(items) => {
            onEditItem(item.id, {
              if: items,
            });
          }}
          recordHistory={() => {}}
          onChange={(items) => {
            onEditItem(item.id, {
              if: items,
            });
          }}
          isNested
        />
        <Editor
          label="否則"
          items={item.else}
          setItems={(items) => {
            onEditItem(item.id, {
              else: items,
            });
          }}
          recordHistory={() => {}}
          onChange={(items) => {
            onEditItem(item.id, {
              else: items,
            });
          }}
          isNested
        />
      </div>
    </>
  );
}
