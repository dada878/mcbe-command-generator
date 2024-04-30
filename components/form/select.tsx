import { cn } from "@/utils/cn";

export default function Select({
  selected,
  setSelected,
  className,
  children,
}: {
  selected: string;
  setSelected: (type: string) => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <select
      className={cn(
        "bg-[#35353c] text-sm p-2 rounded-md outline-none cursor-pointer",
        className
      )}
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
    >
      {children}
    </select>
  );
}
