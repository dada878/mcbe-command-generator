import parseMinecraftTextToJSX from "@/helpers/parseMinecraftTextToJSX";
import React from "react";

export default function Preview({ items }: { items: ItemList }) {
  const elements = praseNewline(
    parseMinecraftTextToJSX(praseItemsToTexts(items).join(""))
  );

  return (
    <div
      className="w-full flex justify-center items-center h-36 rounded-md"
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
  const elementsCopy = [...elements];
  for (const element of elementsCopy) {
    if (element.props.children.includes("\\n")) {
      const index = elementsCopy.indexOf(element);
      elementsCopy[index] = (
        <span key={index}>
          {element.props.children
            .split("\\n")
            .map((line: string, i: number) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
        </span>
      );
    }
  }
  return elementsCopy;
}

function praseItemsToTexts(items: ItemList) {
  const texts : string[] = [];
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
