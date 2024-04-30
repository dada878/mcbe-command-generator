import { cn } from "@/utils/cn";

export default function Input({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      placeholder={placeholder}
      className={cn("bg-[#242429] rounded-md p-2 outline-none text-sm text-[#959595]", className)}
      type="text"
      data-no-dnd="true"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}
