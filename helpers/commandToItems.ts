export default function commandToItems(command: string) {
  const regex = /{"rawtext":.+}/g;
  const match = command.match(regex);
  if (!match) throw new Error("無效的指令格式");
  const jsonFormatted = JSON.parse(match[0]);
  if (!("rawtext" in jsonFormatted)) throw new Error("無效的指令格式");
  const components = jsonFormatted.rawtext;
  return praseCommand(components);
}

let id = 1;

function praseCommand(components: any) {
  const items: any[] = [];
  for (const component of components) {
    if ("text" in component) {
      items.push({
        type: "text",
        content: component.text,
        id: id++,
      });
    }
    if ("objective" in component) {
      items.push({
        type: "score",
        entity: component.name,
        scoreboard: component.objective,
        id: id++,
      });
    }
    if ("selector" in component) {
      items.push({
        type: "entity",
        selector: component.selector,
        id: id++,
      });
    }
    if ("translate" in component) {
      items.push({
        type: "translate",
        content: component.translate,
        id: id++,
        items: praseCommand(component.with.rawtext),
      });
    }
  }
  return items;
}
