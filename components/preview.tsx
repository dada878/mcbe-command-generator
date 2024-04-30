import React from "react";

const colorCodes: { [key: string]: string } = {
  "0": "#000000",
  "1": "#0000AA",
  "2": "#00AA00",
  "3": "#00AAAA",
  "4": "#AA0000",
  "5": "#AA00AA",
  "6": "#FFAA00",
  "7": "#AAAAAA",
  "8": "#555555",
  "9": "#5555FF",
  a: "#55FF55",
  b: "#55FFFF",
  c: "#FF5555",
  d: "#FF55FF",
  e: "#FFFF55",
  f: "#FFFFFF",
};

const formatCodes: { [key: string]: React.CSSProperties } = {
  l: { fontWeight: "bold" },
  o: { fontStyle: "italic" },
  n: { textDecoration: "underline" },
  m: { textDecoration: "line-through" },
};

function parseMinecraftTextToJSX(text: string): JSX.Element[] {
  const regex = /§([0-9a-fk-or])/gi;
  const elements: JSX.Element[] = [];
  let currentStyle: React.CSSProperties = {};

  const parts = text.split(regex);
  parts.forEach((part, index) => {
    if (index % 2 === 0) {
      elements.push(
        <span style={currentStyle} key={index}>
          {part}
        </span>
      );
    } else {
      if (part in colorCodes) {
        currentStyle = { ...currentStyle, color: colorCodes[part] };
      } else if (part in formatCodes) {
        currentStyle = { ...currentStyle, ...formatCodes[part] };
      } else if (part === "r") {
        currentStyle = {};
      }
    }
  });

  return elements;
}

export default function Preview({ items }: { items: ItemList }) {
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

  const elements = parseMinecraftTextToJSX(text);

  for (const element of elements) {
    if (element.props.children.includes("\\n")) {
      const index = elements.indexOf(element);
      elements[index] = (
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
