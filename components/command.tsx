import { successToast } from "@/utils/toast";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Copy } from "lucide-react";

export default function Command({
  json,
  commandType,
}: {
  json: any;
  commandType: string;
}) {
  function getCommandPrefix() {
    switch (commandType) {
      case "tellraw-at-a":
        return "/tellraw @a ";
      case "tellraw-at-p":
        return "/tellraw @p ";
      case "titleraw-actionbar":
        return "/execute as @a at @s run titleraw @s actionbar ";
      default:
        return "";
    }
  }

  const finalCommand =
    getCommandPrefix() + JSON.stringify(json).replaceAll("\\\\", "\\");

  return (
    <div className="bg-[#27272C] rounded-md text-[#C8C8C8] w-full container" id="tour-step-5">
      <p className="text-wrap whitespace-break-spaces break-words p-4 pb-0 break-all text-sm">
        {finalCommand}
      </p>
      <div className="flex justify-end items-center gap-2 p-2">
        <CopyToClipboard
          text={finalCommand}
          onCopy={() => successToast("指令複製成功")}
        >
          <span className="text-gray-400 hover:bg-[#45454e] transition p-2 cursor-pointer rounded-full">
            <Copy size={16} />
          </span>
        </CopyToClipboard>
      </div>
    </div>
  );
}
