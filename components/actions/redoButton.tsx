import { successToast } from "@/utils/toast";
import { Redo } from "lucide-react";
import toast from "react-hot-toast";

export default function RedoButton({
  items,
  setItems,
  history,
  redoHistory,
}: {
  items: ItemList;
  setItems: React.Dispatch<React.SetStateAction<ItemList>>;
  history: React.MutableRefObject<ItemList[]>;
  redoHistory: React.MutableRefObject<ItemList[]>;
}) {
  return (
    <button
      className="bg-[#525355] text-white p-2 text-sm rounded-md"
      data-tooltip-id="tooltip"
      data-tooltip-content="重做"
      onClick={() => {
        if (redoHistory.current.length === 0) return;
        history.current.push(items);
        setItems(redoHistory.current[redoHistory.current.length - 1]);
        redoHistory.current.pop();
        successToast("重做成功");
      }}
    >
      <Redo size="16" />
    </button>
  );
}
