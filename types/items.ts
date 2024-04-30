interface Item {
  id: string;
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
  children: string[];
}

interface CreateItem extends Item {}

type AnyItem = TextItem | ScoreItem | EntityItem | TranslateItem | CreateItem;
type ItemList = AnyItem[];
