import { cn } from "@/utils/cn";

export default function Button({
  onClick,
  children,
  className,
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      // other theme: bg-[#525355] 
      className={cn(
        "bg-[#35353c] p-2 text-sm rounded-md",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}