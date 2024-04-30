import Input from "../form/input";

export default function ScoreItem({
  item,
  onEditItem,
}: {
  item: ScoreItem;
  onEditItem: (id: number, data: any) => void;
}) {
  return (
    <>
      <p className="md:text-base text-sm">分數元件</p>
      <Input
        value={item.entity}
        onChange={(value) => {
          onEditItem(item.id, { entity: value });
        }}
      />
      <Input
        value={item.scoreboard.toString()}
        onChange={(value) => {
          onEditItem(item.id, { scoreboard: value });
        }}
      />
    </>
  );
}