import Input from "../input";

export default function ScoreItem({
  item,
  onEditItem,
}: {
  item: ScoreItem;
  onEditItem: (id: string, data: any) => void;
}) {
  return (
    <>
      <p>分數元件</p>
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