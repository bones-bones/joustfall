// This is the way cards will register against the listener framework
type InterventionPoint = {
  type:
    | "None"
    | "wouldApplyDamage"
    | "wouldDetermineCostForSpell"
    | "enters"
    | "checkHandSize"
    | "onOwnerTurnStart";
  conditional?: () => boolean;
  effect: () => Effect;
  check?: () => Check;
};

type Effect = {
  type: string;
};

type BreakEffect = { target: string; type: "break" };

// To be used at runtime
type EffectInFlight = Effect & { sourceId: string };

type ChoiceEffect = {
  type: "choice";
  choices: string[];
  handler: () => any;
};

export type Card = {
  name: string;
  school: "Arcane" | "Deep" | "Divine" | "Primal" | "Generic";
  cost?: number;
  pitch?: number;
  stability?: number;
  type: ("Class" | "Hex" | "Orb")[];
  interventionPoints?: InterventionPoint[];
};

type CardAtRuntime = Card & {
  revealed: boolean;
  attachedTo?: string;
  counters?: { type: string; count: number }[];
  coveredBy?: { id: string }[];
};

export const cards: Record<string, Card> = {
  Arriviste: {
    name: "Arriviste",
    school: "Deep",
    type: ["Class"],
    interventionPoints: [
      {
        type: "wouldApplyDamage",
        conditional: () => {
          // Check count of controlled spells
          return false;
        },
        effect: () => {
          // Figure out if I should set damage to zero
          return { type: "modify" };
        },
      },
      {
        type: "wouldDetermineCostForSpell",
        conditional: () => {
          // check count of controlled spells
          return false;
        },
        effect: () => {
          // figure out how to modify casting cost
          return { type: "modify" };
        },
      },
    ],
  },
  Recourse: {
    name: "Recourse",
    school: "Divine",
    type: ["Hex"],
    cost: 3,
    pitch: 2,
    stability: 1,
    interventionPoints: [{ type: "enters", effect: () => {} }],
  },
  "Plasma Miasma": {
    name: "Plasma Miasmo",
    school: "Deep",
    type: ["Orb"],
    cost: 1,
    pitch: 2,
    stability: 2,
    interventionPoints: [
      {
        type: "checkHandSize",
        check: (handSize: HandSizeCheck) => {
          return handSize + 1;
        },
      },

      {
        type: "onOwnerTurnStart",
        effect: () => {
          return {
            type: "choice",
            choices: ["Break Plasma Miasma", "Take 1 damage"],
            handler: (choice: string) => {
              if (choice === "Break Plasma Miasma") {
                return { type: "break", target: "self" };
              } else {
                return { type: "takeDamage", value: 1 };
              }
            },
          };
        },
      },
    ],
  },
};

type Check = {};
type HandSizeCheck = { type: "handSizeCheck"; value: number };
