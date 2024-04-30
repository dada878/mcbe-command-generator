import { successToast } from "@/utils/toast";
import { Undo } from "lucide-react";
import toast from "react-hot-toast";

export default function UndoButton({
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
      data-tooltip-content="復原"
      onClick={() => {
        if (history.current.length === 0) return;
        redoHistory.current.push(items);
        setItems(history.current[history.current.length - 1]);
        history.current.pop();
        successToast("復原成功");
      }}
    >
      <Undo size="16" />
    </button>
  );
}
