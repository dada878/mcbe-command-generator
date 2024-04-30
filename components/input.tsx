export default function Input({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      className="bg-[#242429] rounded-md p-2 outline-none text-sm text-[#959595]"
      type="text"
      data-no-dnd="true"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}
