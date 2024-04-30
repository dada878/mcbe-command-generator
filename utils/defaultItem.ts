export const textItem = {
  type: "text",
  content: "這是一段文字",
};

export const scoreItem = {
  type: "score",
  entity: "@s",
  scoreboard: "score",
};

export const entityItem = {
  type: "entity",
  selector: "@s",
};

export const translateItem = {
  type: "translate",
  content: "這是一段文字",
  items: [
    {
      id: "translate-item",
      type: "text",
      content: "這是一段文字",
    },
  ],
};