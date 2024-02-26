export type SpellCard = {
  Cost: number;
  Rarity: string;
} & Base;

export type Base = {
  Name: string;
  Types: string;
  Subtypes: string;
  Pitch: number | null;
  Text: string;
  Stability: number | null;
  Art?: string;
  Image?: string;
  School: string;
  "Collector Info"?: string;
};
