import type { cardImpl } from "./cardImpl";

export type Targetless<T> = Omit<T, "target">;

export type GameAction<T = void> = T & {
  source?: GameSpellObject;
  field: GameSpellObject[];
  self?: GameSpellObject;
};

export type GlobalAction =
  | DamagePayload
  | StartOfGame
  | SelectTarget
  | Create
  | CompositeAction;
export type DamagePayload = {
  target: string;
  amount: number;
  source: GameSpellObject;
  action: "damageWouldBeDealt";
};

export type StartOfGame = {
  action: "startOfGame";
};

export type CompositeAction = {
  action: "composite";
  components: GlobalAction[];
};

export type SelectTarget<T = any> = GameAction<{
  action: "selectTarget";
  validTargetSelector: (value: TargetSelectionContext) => GameSpellObject[];
  player: "p1" | "p2";
  nextAction: Targetless<T>;
}>;

export type Create = {
  action: "create";
  objects: { owner: "p1" | "p2"; type: keyof typeof cardImpl }[];
};

export type GameSpellObject = {
  type: keyof typeof cardImpl;
  id: string;
  controller: "p1" | "p2" | "Lich";
};

export type TargetSelectionContext = {
  thisThing: GameSpellObject;
  field: GameSpellObject[];
};

// export type Move
