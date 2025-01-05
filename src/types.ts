export type Base = {
  Name: string;
  Types: string;
  //Subtypes: string;
  Pitch: number | null;
  Text: string;
  Stability: number | null;
  Art?: string;
  Image?: string;
  School: string;
};

export interface Base2 {
  Name: string;
  Class: string;
  Types: string;
  Text: string;
  Image?: string;
}

export type Class = Base2 & Collectable;
export type SpellCard = Collectable & Base2 & GameObject & Rarity;
export type Token = GameObject & Base2;

interface Rarity {
  Rarity: string;
}
interface Collectable {
  "Collector Info"?: string;
}

interface GameObject {
  Cost: number | null; //okay this kinda sucks for tokens
  Pitch: number | null;
  Stability: number | null;
}
