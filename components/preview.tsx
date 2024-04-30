import parseMinecraftTextToJSX from "@/helpers/parseMinecraftTextToJSX";
import React from "react";

export default function Preview({ items }: { items: ItemList }) {
  const elements = praseNewline(
    parseMinecraftTextToJSX(
      praseItemsToText(items)
    )
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

function praseItemsToText(items: ItemList) {
  let text = "";
  for (const item of items) {
    switch (item.type) {
      case "text": {
        const textItem = item as TextItem;
        text += textItem.content;
        break;
      }
      case "score": {
        text += "123";
        break;
      }
      case "entity": {
        text += "Dada878";
        break;
      }
    }
  }
  return text;
}