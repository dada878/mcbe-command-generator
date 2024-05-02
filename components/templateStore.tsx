import Button from "./form/button";
import Preview from "./preview";

export default function TemplateStore({
  onApply,
}: {
  onApply: (command: string) => void;
}) {
  return (
    <div className="bg-[#27272C] p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {templates.map(template => (
        <>
          <div className="flex flex-col gap-3 w-56">
            <h3>{template.name}</h3>
            <Preview command={template.command} />
            <Button
              onClick={() => {
                onApply(template.command);
              }}
            >
              套用
            </Button>
          </div>
        </>
      ))}
    </div>
  );
}

const templates = [
  {
    name: "基本文字",
    description: "A title for your video",
    command: `{"rawtext":[{"text":"早安這裡是我的地圖 :>"}]}`,
  },
  {
    name: "計分板分數",
    description: "A title for your video",
    command: `{"rawtext":[{"text":"§e金幣§f：§b"},{"score":{"name":"@s","objective":"coin"}}]}`,
  },
  {
    name: "多個記分板",
    description: "A title for your video",
    command: `{"rawtext":[{"text":"§e金幣§f：§f"},{"score":{"name":"@s","objective":"coin"}},{"text":"\\\\n§b鑽石§f："},{"score":{"name":"@s","objective":"diamond"}}]}`,
  },
  {
    name: "所有玩家",
    description: "A title for your video",
    command: `{"rawtext":[{"text":"§a世界中的玩家：§f"},{"selector":"@a"}]}`,
  },
  {
    name: "翻譯元件範例",
    description: "A title for your video",
    command: `{"rawtext":[{"translate":"%%s §c攻擊了§f %%s","with":{"rawtext":[{"selector":"@r"},{"selector":"@r"}]}}]}`,
  },
  {
    name: "更多文字格式",
    description: "A title for your video",
    command: `{"rawtext":[{"text":"§l§b租體 §r重置 §o§e斜體"},{"text":"§r\\\\n§c紅§6橙§e黃§a綠§b藍§1靛§d紫"}]}`,
  },
  {
    name: "判斷元件範例",
    description: "A title for your video",
    command: `{"rawtext":[{"text":"你的身份是："},{"translate":"%%2","type":"control","with":{"rawtext":[{"selector":"@s[tag=killer]"},{"rawtext":[{"text":"§c殺手"}]},{"rawtext":[{"text":"§a平民"}]}]}}]}`,
  },
  {
    name: "雪球菜單",
    description: "A title for your video",
    command: `{"rawtext":[{"text":"§e【傳送選單】§r\\\\n"},{"translate":"%%2","type":"control","with":{"rawtext":[{"selector":"@s[scores={menu=1}]"},{"rawtext":[{"text":"§l§b> "}]},{"rawtext":[{"text":"§r"}]}]}},{"text":"大廳\\\\n"},{"translate":"%%2","type":"control","with":{"rawtext":[{"selector":"@s[scores={menu=2}]"},{"rawtext":[{"text":"§l§b> "}]},{"rawtext":[{"text":"§r"}]}]}},{"text":"小遊戲\\\\n"},{"translate":"%%2","type":"control","with":{"rawtext":[{"selector":"@s[scores={menu=3}]"},{"rawtext":[{"text":"§l§b> "}]},{"rawtext":[{"text":"§r"}]}]}},{"text":"休閒區"}]}`,
  },
  {
    name: "巢狀判斷",
    description: "A title for your video",
    command: `{"rawtext":[{"text":"你的種族："},{"translate":"%%2","type":"control","with":{"rawtext":[{"selector":"@s[scores={level=1..10}]"},{"rawtext":[{"translate":"%%2","type":"control","with":{"rawtext":[{"selector":"@s[tag=goblin]"},{"rawtext":[{"text":"§a哥布林"}]},{"rawtext":[{"text":"§b森林酋長"}]}]}}]},{"rawtext":[{"translate":"%%2","type":"control","with":{"rawtext":[{"selector":"@s[tag=magic]"},{"rawtext":[{"text":"§e紅魔族"}]},{"rawtext":[{"text":"§c大法師"}]}]}}]}]}}]}`,
  },
];
