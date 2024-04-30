import { FolderInput } from "lucide-react";
import Button from "./form/button";
import Select from "./form/select";
import { useState } from "react";
import Dialog from "./dialog";
import Input from "./form/input";
import commandToItems from "@/helpers/commandToItems";

export default function ActionBar({
  commandType,
  setCommandType,
  updateItems,
}: {
  commandType: string;
  setCommandType: (type: string) => void;
  updateItems: (items: any[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [command, setCommand] = useState<string>("");
  return (
    <>
      <div className="bg-[#27272C] text-[#C8C8C8] flex gap-4 w-full p-4 rounded-md">
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          className="flex gap-2 items-center"
        >
          <FolderInput size={16} />
          從指令載入
        </Button>
        <Select selected={commandType} setSelected={setCommandType}>
          <option value="rawtext">未設定指令類型</option>
          <option value="tellraw-at-a">/tellraw @a</option>
          <option value="tellraw-at-p">/tellraw @p</option>
          <option value="titleraw-actionbar">/titleraw actionbar</option>
        </Select>
      </div>
      <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="flex flex-col gap-4 bg-[#27272C] rounded-md w-48 p-4">
          <div className="flex flex-col gap-3 justify-center">
            <Input
              placeholder="輸入指令"
              className="bg-[#35353c]"
              value={command}
              onChange={setCommand}
            />
            <Button
              onClick={() => {
                updateItems(commandToItems(command));
                setIsOpen(false);
              }}
              className="bg-[#525355] text-white p-2 text-sm rounded-md"
            >
              確定
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
