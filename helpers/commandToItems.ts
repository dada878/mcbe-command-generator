import getNextId from "./getNextId";

export default function commandToItems(command: string) {
  const regex = /{"rawtext":.+}/g;
  const match = command.match(regex);
  if (!match) throw new Error("無效的指令格式");
  const jsonFormatted = JSON.parse(match[0]);
  if (!("rawtext" in jsonFormatted)) throw new Error("無效的指令格式");
  const components = jsonFormatted.rawtext;
  return praseCommand(components);
}

function praseSwitch(component: any): any[] {
  const selector = component.with.rawtext[0].selector;
  const items = praseCommand(component.with.rawtext[1].rawtext);
  if (component.with.rawtext.length === 2) return [{ selector, items }];
  return [{ selector, items }, ...praseSwitch(component.with.rawtext[2])];
}

function praseCommand(components: any) {
  const items: any[] = [];
  for (const component of components) {

    // process custom components first
    if (component.type === "control") {
      items.push({
        type: "control",
        id: getNextId(items),
        selector: component.with.rawtext[0].selector,
        if: praseCommand(component.with.rawtext[1].rawtext),
        else: praseCommand(component.with.rawtext[2].rawtext),
      });
    } else if (component.type === "switch") {
      items.push({
        type: "switch",
        id: getNextId(items),
        cases: praseSwitch(component.rawtext[0]),
      });
    
      // process built-in components
    } else if ("text" in component) {
      items.push({
        type: "text",
        content: component.text,
        id: getNextId(items),
      });
    } else if ("score" in component) {
      items.push({
        type: "score",
        entity: component.score.name,
        scoreboard: component.score.objective,
        id: getNextId(items),
      });
    } else if ("selector" in component) {
      items.push({
        type: "entity",
        selector: component.selector,
        id: getNextId(items),
      });
    } else if ("translate" in component) {
      items.push({
        type: "translate",
        content: component.translate,
        id: getNextId(items),
        items: praseCommand(component.with.rawtext),
      });
    }
  }
  return items;
}
