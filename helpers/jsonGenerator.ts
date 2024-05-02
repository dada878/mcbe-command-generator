export function generateJson(items: ItemList): any {
  return {
    rawtext: items
      .map((item) => {
        switch (item.type) {
          case "text": {
            const textItem = item as TextItem;
            return {
              text: textItem.content,
            };
          }
          case "score": {
            const scoreItem = item as ScoreItem;
            return {
              score: {
                name: scoreItem.entity,
                objective: scoreItem.scoreboard,
              },
            };
          }
          case "entity": {
            const entityItem = item as EntityItem;
            return {
              selector: entityItem.selector,
            };
          }
          case "translate": {
            const translateItem = item as TranslateItem;
            return {
              translate: translateItem.content,
              with: generateJson(translateItem.items),
            };
          }
        }
      })
      .filter((item) => item),
  };
}
