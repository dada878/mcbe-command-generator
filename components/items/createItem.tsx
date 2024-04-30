import { Plus } from "lucide-react";
import { useState } from "react";
import Dialog from "../dialog";
import Select from "../form/select";

export default function CreateItem({
  handleAddItem,
}: {
  handleAddItem: (type: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("text");

  function openModal() {
    setIsOpen(true);
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
            <Select selected={selectedType} setSelected={setSelectedType} className="w-full" >
              <option value="text">文字元件</option>
              <option value="score">分數元件</option>
              <option value="entity">實體元件</option>
              <option value="translate">翻譯元件</option>
            </Select>
            <button
              className="bg-[#525355] text-white p-2 text-sm rounded-md"
              onClick={() => {
                handleAddItem(selectedType);
                closeModal();
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
