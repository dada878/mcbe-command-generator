export default function CreateCard({
  selectedType,
  setSelectedType,
  handleAddItem,
}: {
  selectedType: string;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  handleAddItem: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 bg-[#27272C] rounded-md p-4">
      <div className="size-36 flex flex-col gap-3 justify-center">
        <h2 className="text-white text-center">添加元件</h2>
        <select
          className="w-full bg-[#35353c] text-sm text-white p-2 rounded-md outline-none cursor-pointer"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="text">文字元件</option>
          <option value="score">分數元件</option>
          <option value="entity">實體元件</option>
        </select>
        <button
          className="bg-[#525355] text-white p-2 text-sm rounded-md"
          onClick={handleAddItem}
        >
          添加
        </button>
      </div>
    </div>
  );
}
