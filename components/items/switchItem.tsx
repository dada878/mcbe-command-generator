import { Plus } from "lucide-react";
import Editor from "../editor";
import Input from "../form/input";
import Button from "../form/button";

export default function SwitchItem({
  item,
  onEditItem,
}: {
  item: SwitchItem;
  onEditItem: (id: number, data: any) => void;
}) {
  return (
    <>
      <p className="md:text-base text-sm">選擇元件</p>
      <div className="flex gap-3">
        {item.cases.map((c, i) => (
          <div className="flex flex-col gap-3" key={i}>
            <Input
              value={c.selector}
              onChange={(value) => {
                onEditItem(item.id, {
                  cases: item.cases.map((c, j) =>
                    j === i ? { ...c, selector: value } : c
                  ),
                });
              }}
            />
            <Editor
              label="元件"
              items={c.items}
              setItems={(items) => {
                onEditItem(item.id, {
                  cases: item.cases.map((c, j) =>
                    j === i ? { ...c, items: items } : c
                  ),
                });
              }}
              recordHistory={() => {}}
              onChange={(items) => {
                onEditItem(item.id, {
                  cases: item.cases.map((c, j) =>
                    j === i ? { ...c, items: items } : c
                  ),
                });
              }}
              isNested
            />
            <Button
              className="bg-[#27272C]"
              onClick={() => {
                const caseIndex = item.cases.findIndex(
                  (c) => JSON.stringify(c) === JSON.stringify(item.cases[i])
                );
                if (caseIndex === -1) {
                  return;
                }
                const nextCases = [
                  ...item.cases.slice(0, caseIndex),
                  ...item.cases.slice(caseIndex + 1),
                ];
                onEditItem(item.id, { cases: nextCases });
              }}
            >
              刪除
            </Button>
          </div>
        ))}
        <div
          className="bg-[#27272C] flex justify-center items-center min-w-40 min-h-40 rounded-md"
          onClick={() => {
            onEditItem(item.id, {
              cases: [...item.cases, { selector: "@s", items: [] }],
            });
          }}
        >
          <Plus className="size-10" />
        </div>
      </div>
    </>
  );
}
