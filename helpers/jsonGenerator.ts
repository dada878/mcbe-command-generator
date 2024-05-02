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
          case "control": {
            const controlItem = item as ControlItem;
            return {
              translate: "%%2",
              type: "control",
              with: {
                rawtext: [
                  {
                    selector: controlItem.selector,
                  },
                  controlItem.if.length === 0
                    ? {
                        text: "",
                      }
                    : generateJson(controlItem.if),
                  controlItem.else.length === 0
                    ? {
                        text: "",
                      }
                    : generateJson(controlItem.else),
                ],
              },
            };
          }
          case "switch": {
            const switchItem = item as SwitchItem;
            return {
              type: "switch",
              rawtext: [buildSwitch(switchItem.cases)],
            };
          }
        }
      })
      .filter((item) => item),
  };
}

function buildSwitch(cases: SwitchItemCase[]): any {
  if (cases.length === 0) {
    return null;
  }
  const currentCase = cases[0];
  return cases.length === 1
    ? {
        translate: "%%2",
        with: {
          rawtext: [
            {
              selector: currentCase.selector,
            },
            generateJson(currentCase.items),
          ],
        },
      }
    : {
        translate: "%%2",
        with: {
          rawtext: [
            {
              selector: currentCase.selector,
            },
            generateJson(currentCase.items),
            buildSwitch(cases.toSpliced(0, 1)),
          ],
        },
      };
}
