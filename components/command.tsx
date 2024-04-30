import { Copy } from "lucide-react";
import toast from "react-hot-toast";

export default function Command({ json }: { json: any }) {
  function handleCopy() {
    navigator.clipboard.writeText(JSON.stringify(json));
    toast.success("已複製到剪貼簿", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
      position: "bottom-right",
      duration: 2000,
    });
  }

  return (
    <div className="bg-[#27272C] rounded-md text-white w-full">
      <p className="text-wrap whitespace-break-spaces break-words p-4 pb-0 break-all text-sm">
        {JSON.stringify(json)}
      </p>
      <div className="flex justify-end items-center gap-2 p-2">
        <span
          className="text-gray-400 hover:bg-[#45454e] transition p-2 cursor-pointer rounded-full"
          onClick={handleCopy}
          data-tooltip-id="tooltip"
          data-tooltip-content="複製指令"
        >
          <Copy size={16} />
        </span>
      </div>
    </div>
  );
}
