import {
  CircleHelp,
  FolderInput,
  LayoutTemplate,
  LucideTrash2,
  Share2Icon,
} from "lucide-react";
import Button from "./form/button";
import Select from "./form/select";
import { useRef, useState } from "react";
import Dialog from "./dialog";
import Input from "./form/input";
import commandToItems from "@/helpers/commandToItems";
import { cn } from "@/utils/cn";
import TemplateStore from "./templateStore";
import { errorToast, successToast } from "@/utils/toast";
import { useTour } from "@reactour/tour";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { generateJson } from "@/helpers/jsonGenerator";
import { domain } from "@/utils/constants";
import CopyToClipboard from "react-copy-to-clipboard";

export default function ActionBar({
  commandType,
  setCommandType,
  updateItems,
  className,
  items,
}: {
  commandType: string;
  setCommandType: (type: string) => void;
  updateItems: (items: any[]) => void;
  className?: string;
  items: AnyItem[];
}) {
  const { setIsOpen } = useTour();
  const [isCommandDialogOpen, setIsCommandDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [command, setCommand] = useState<string>("");
  const [shareLink, setShareLink] = useState<string>("");
  const lastSharedCommand = useRef<string | null>(null);
  const commandString = JSON.stringify(generateJson(items));
  return (
    <>
      <div
        id="tour-step-6"
        className={cn(
          "bg-[#27272C] text-[#C8C8C8] flex gap-2 sm:gap-4 w-full p-3 md:p-4 rounded-md container",
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
          <span className="hidden md:inline">從指令載入</span>
        </Button>
        <Button
          onClick={() => {
            setIsConfirmDialogOpen(true);
          }}
          className="flex gap-2 items-center"
        >
          <LucideTrash2 size={16} />
          <span className="hidden md:inline">清除全部</span>
        </Button>
        <Button
          onClick={() => {
            setIsTemplateDialogOpen(true);
          }}
          className="flex gap-2 items-center"
        >
          <LayoutTemplate size={16} />
          <span className="hidden md:inline">套用模板</span>
        </Button>
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          className="flex gap-2 items-center"
        >
          <CircleHelp size={16} />
          <span className="hidden md:inline">使用說明</span>
        </Button>
        <Button
          onClick={() => {
            setIsShareDialogOpen(true);
            if (lastSharedCommand.current === commandString) {
              return;
            }
            setShareLink("");
            addDoc(collection(db, "share"), {
              command: commandString,
            }).then((doc) => {
              setShareLink(`${domain}/rawtext?share=${doc.id}`);
              lastSharedCommand.current = commandString;
            });
          }}
          className="flex gap-2 items-center"
        >
          <Share2Icon size={16} />
          <span className="hidden md:inline">分享指令</span>
        </Button>
        <Select selected={commandType} setSelected={setCommandType}>
          <option value="rawtext">rawtext</option>
          <option value="tellraw-at-a">/tellraw</option>
          <option value="titleraw-actionbar">/titleraw</option>
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
                try {
                  updateItems(
                    commandToItems(command.replaceAll("\\n", "\\\\n"))
                  );
                  setIsCommandDialogOpen(false);
                } catch (e) {
                  if (e instanceof Error) {
                    errorToast(e.message);
                  }
                }
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
        <TemplateStore
          onApply={(command) => {
            updateItems(commandToItems(command));
            setIsTemplateDialogOpen(false);
          }}
        />
      </Dialog>
      <Dialog isOpen={isShareDialogOpen} setIsOpen={setIsShareDialogOpen}>
        <div className="flex flex-col gap-4 bg-[#27272C] min-w-48 rounded-md p-4">
          <div className="flex flex-col gap-3 justify-center items-center">
            <div className="text-lg">分享指令</div>
            <div className="text-sm">
              {shareLink ? (
                <p
                className="bg-[#35353c] p-2 text-white rounded-md w-full text-center"
                >
                  {shareLink}
                </p>
              ) : (
                "生成中..."
              )}
            </div>
            <CopyToClipboard
              text={shareLink}
              onCopy={() => {
                successToast("連結複製成功");
              }}
            >
              <Button
                onClick={() => {}}
                className={cn("bg-[#525355] text-white p-2 text-sm rounded-md")}
              >
                複製連結
              </Button>
            </CopyToClipboard>
          </div>
        </div>
      </Dialog>
    </>
  );
}
