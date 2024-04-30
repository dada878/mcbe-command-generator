import { FolderInput, LayoutTemplate, LucideTrash2 } from "lucide-react";
import Button from "./form/button";
import Select from "./form/select";
import { useState } from "react";
import Dialog from "./dialog";
import Input from "./form/input";
import commandToItems from "@/helpers/commandToItems";
import { cn } from "@/utils/cn";
import TemplateStore from "./templateStore";

export default function ActionBar({
  commandType,
  setCommandType,
  updateItems,
  className,
}: {
  commandType: string;
  setCommandType: (type: string) => void;
  updateItems: (items: any[]) => void;
  className?: string;
}) {
  const [isCommandDialogOpen, setIsCommandDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [command, setCommand] = useState<string>("");
  return (
    <>
      <div
        className={cn(
          "bg-[#27272C] text-[#C8C8C8] flex gap-4 w-full p-4 rounded-md container",
          className
        )}
      >
        <Button
          onClick={() => {
            setIsCommandDialogOpen(true);
          }}
          className="flex gap-2 items-center"
        >
          <FolderInput size={16} />
          從指令載入
        </Button>
        <Button
          onClick={() => {
            setIsConfirmDialogOpen(true);
          }}
          className="flex gap-2 items-center"
        >
          <LucideTrash2 size={16} />
          清除全部
        </Button>
        <Button onClick={() => {
          setIsTemplateDialogOpen(true);
        }} className="flex gap-2 items-center">
          <LayoutTemplate size={16} />
          套用模板
        </Button>

        <Select selected={commandType} setSelected={setCommandType}>
          <option value="rawtext">未設定指令類型</option>
          <option value="tellraw-at-a">/tellraw @a</option>
          <option value="tellraw-at-p">/tellraw @p</option>
          <option value="titleraw-actionbar">/titleraw actionbar</option>
        </Select>
      </div>
      <Dialog isOpen={isCommandDialogOpen} setIsOpen={setIsCommandDialogOpen}>
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
                setIsCommandDialogOpen(false);
              }}
              className="bg-[#525355] text-white p-2 text-sm rounded-md"
            >
              確定
            </Button>
          </div>
        </div>
      </Dialog>
      <Dialog isOpen={isConfirmDialogOpen} setIsOpen={setIsConfirmDialogOpen}>
        <div className="flex flex-col gap-4 bg-[#27272C] rounded-md p-4">
          <div className="flex flex-col gap-3 justify-center items-center">
            <div className="text-lg">確定要清除所有內容嗎？</div>
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  updateItems([]);
                  setIsConfirmDialogOpen(false);
                }}
                className={cn("bg-red-500 text-white p-2 text-sm rounded-md")}
              >
                確定
              </Button>
              <Button
                onClick={() => {
                  setIsConfirmDialogOpen(false);
                }}
                className={cn("bg-[#525355] text-white p-2 text-sm rounded-md")}
              >
                取消
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
      <Dialog isOpen={isTemplateDialogOpen} setIsOpen={setIsTemplateDialogOpen}>
        <TemplateStore onApply={
          (command) => {
            updateItems(commandToItems(command));
            setIsTemplateDialogOpen(false);
          }
        } />
      </Dialog>
    </>
  );
}
