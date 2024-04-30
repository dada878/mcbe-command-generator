import commandToItems from "@/helpers/commandToItems";
import parseMinecraftTextToJSX from "@/helpers/parseMinecraftTextToJSX";
import React from "react";

export default function Preview({ command }: { command: string }) {
  const elements = praseNewline(
    parseMinecraftTextToJSX(praseItemsToTexts(
      commandToItems(command)
    ).join(""))
  );

  return (
    <div
      id="tour-step-4"
      className="w-full flex justify-center items-center min-h-36 bg-no-repeat py-4 px-2 bg-cover bg-center rounded-md container"
      style={{
        backgroundImage: `url("../../preview-bg.png")`,
      }}
    >
      <p className="text-white bg-black/60 p-3 text-sm rounded-md">
        {elements}
      </p>
    </div>
  );
}

function praseNewline(elements: JSX.Element[]) {
  const result = [];
  for (const element of elements) {
    if (element.props.children.includes("\\n")) {
      const lines = element.props.children.split("\\n");
      for (let i = 0; i < lines.length; i++) {
        result.push(
          <span style={element.props.style}>
            {lines[i]}
          </span>
        );
        if (i !== lines.length - 1) {
          result.push(<br />);
        }
      }
    } else {
      result.push(element);
    }
  }
  return result;
}

function praseItemsToTexts(items: ItemList) {
  const texts: string[] = [];
  for (const item of items) {
    switch (item.type) {
      case "text": {
        const textItem = item as TextItem;
        texts.push(textItem.content);
        break;
      }
      case "score": {
        texts.push("123");
        break;
      }
      case "entity": {
        texts.push("Dada878");
        break;
      }
      case "translate": {
        const args = praseItemsToTexts((item as TranslateItem).items);
        const translateItem = item as TranslateItem;
        let index = 0;
        let content = translateItem.content;
        // process %%s
        while (content.includes("%%s")) {
          const arg = index < args.length ? args[index] : "";
          content = content.replace("%%s", arg);
          index++;
        }
        // process %%d
        while (content.includes("%%d")) {
          const arg = index < args.length ? args[index] : "";
          content = content.replace("%%d", arg);
          index++;
        }
        // process %%n
        for (let i = 1; i <= 9; i++) {
          const currentIndex = index + i - 1;
          const outOfRange = currentIndex >= args.length || currentIndex < 0;
          const arg = outOfRange ? "" : args[currentIndex];
          content = content.replaceAll(`%%${i}`, arg);
        }
        texts.push(content);
        break;
      }
    }
  }
  return texts;
}
