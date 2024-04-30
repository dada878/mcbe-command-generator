interface Item {
  id: number;
  type: string;
}

interface TextItem extends Item {
  content: string;
}

interface ScoreItem extends Item {
  entity: string;
  scoreboard: string;
}

interface EntityItem extends Item {
  selector: string;
}

interface TranslateItem extends Item {
  content: string;
  items: ItemList;
}

interface CreateItem extends Item {}

type AnyItem = TextItem | ScoreItem | EntityItem | TranslateItem | CreateItem;
type ItemList = AnyItem[];
