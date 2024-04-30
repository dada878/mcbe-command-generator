import { Plus } from "lucide-react";
import { Fragment, useRef, useState } from "react";
import Dialog from "../dialog";

export default function CreateItem({
  handleAddItem,
}: {
  handleAddItem: (type: string) => void;
}) {
  let subtitle = useRef<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("text");

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.

    if (subtitle.current?.style) {
      subtitle.current.style.color = "#f00";
    }
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <div
        className="flex justify-center items-center cursor-pointer h-full w-full"
        onClick={openModal}
      >
        <Plus className="size-12" />
      </div>
      <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="flex flex-col gap-4 bg-[#27272C] rounded-md w-36 p-4">
          <div className="flex flex-col gap-3 justify-center">
            <select
              className="w-full bg-[#35353c] text-sm text-white p-2 rounded-md outline-none cursor-pointer"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="text">文字元件</option>
              <option value="score">分數元件</option>
              <option value="entity">實體元件</option>
            </select>
            <button
              className="bg-[#525355] text-white p-2 text-sm rounded-md"
              onClick={() => {
                handleAddItem(selectedType);
                setIsOpen(false);
              }}
            >
              添加
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
