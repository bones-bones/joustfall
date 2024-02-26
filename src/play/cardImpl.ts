import {
  CompositeAction,
  DamagePayload,
  GameAction,
  GameSpellObject,
  SelectTarget,
} from "./types";

export const cardImpl: Record<
  | "Druid"
  | "Paladin"
  | "Magic Missiles"
  | "Lich"
  | "Summon Squirrel"
  | "Curing Caverns"
  | "Burning Brush"
  | "Bold Fortune"
  | "Turn to Flame"
  | "Burn"
  | "Ax",
  {
    endOfTurn?: (state: GameAction<unknown>) => any;
    startOfGame?: (state: GameAction<any>) => any;
    damageWouldBeDealt?: (payload: GameAction<DamagePayload>) => any;
    etb?: ({ field, source }: GameAction<any>) => any;
    Subtypes: string;
    onBreak?: (state: GameAction<any>) => any;
    beginningOfTurn?: (state: GameAction<any>) => any;
  }
> = {
  "Summon Squirrel": { Subtypes: "Summon" },
  Lich: {
    Subtypes: "Lich",
    endOfTurn: ({ self }): DamagePayload => {
      return {
        target: "druid",
        amount: 1,
        action: "damageWouldBeDealt",
        source: self!,
        // source: {} as any,
      };
    },
  },
  Druid: {
    Subtypes: "Class",
    startOfGame: () => {
      return {
        action: "create",
        objects: [
          { type: "Summon Squirrel", owner: "self" },
          { type: "Summon Squirrel", owner: "self" },
        ],
      };
    },

    // field.filter(owner,subtype)
    damageWouldBeDealt: ({
      target,
      source,
      field,
      amount,
    }: GameAction<DamagePayload>): undefined | SelectTarget<DamagePayload> => {
      if (target === "druid" && target === source.id) {
        return {
          action: "selectTarget",
          player: "p1",
          field,
          nextAction: {
            action: "damageWouldBeDealt",
            amount,
            source: source,
          },
          source: field.find((entry) => entry.id === target)!,

          validTargetSelector: ({
            thisThing,
            field,
          }: {
            thisThing: GameSpellObject;
            field: GameSpellObject[];
          }) => {
            return field.filter((entry) => {
              return (
                entry.controller === thisThing.controller &&
                cardImpl[entry.type].Subtypes === "Summon"
              );
            });
          },
        };
      }
    },
  },

  Ax: {
    Subtypes: "Empheral",
    etb: ({ field, source, self }): SelectTarget<DamagePayload> => {
      return {
        action: "selectTarget",
        player: "p1",
        field,
        source,
        validTargetSelector: ({ field }: { field: GameSpellObject[] }) => field,
        nextAction: {
          action: "damageWouldBeDealt",
          amount: 7,
          source: self,

          //  source,
        },
      };
    },
  },
  Paladin: {
    Subtypes: "Class",
    endOfTurn: () => {
      // Add a defense counter
    },
  },
  "Magic Missiles": {
    Subtypes: "Evocation",
    etb: () => {
      // target up to 3
    },
  },
  "Burning Brush": {
    Subtypes: "Place",
    endOfTurn: () => {
      // filter to player, check cards in hand
    },
  },
  "Curing Caverns": {
    Subtypes: "Place",
    onBreak: () => {
      //
    },
  },
  "Bold Fortune": {
    Subtypes: "Enchantment",
    beginningOfTurn: () => {
      // Dispatch combined effects of Break(this), all cards, draw 7 cards
    },
  },
  Burn: {
    Subtypes: "Token",
    endOfTurn: (): CompositeAction => {
      return {
        action: "composite",
        components: [
          {
            action: "damageWouldBeDealt",
            amount: 1,
            target: "self" as any,
            source: "self" as any,
          },
          {
            action: "damageWouldBeDealt",
            amount: 1,
            target: "p2" as any,
            source: "self" as any,
          },
        ],
      };
    },
  },
  "Turn to Flame": {
    Subtypes: "Hex",
    etb: ({ source, field }: GameAction): CompositeAction => {
      //

      return {
        action: "composite",
        components: [
          {
            action: "selectTarget",
            player: "p1",
            nextAction: { action: "break" },
            validTargetSelector: () => field,
            source,
            field,
          },
          {
            action: "create",
            objects: [{ owner: "p2", type: "Burn" }],
          },
        ],
      };
    },
  },
} as const;

export const paladin = {
  endOfTurn: ({ field }: { field: any[] }) => {
    return { action: "place", targets: field };
  },
};

type PlayerSearch = {
  player: "p1" | "p2";
  cardsToSearch: GameSpellObject[];
};

// const burningBrush={
//     endOfTurn:()=>{
//         if(gameState.p1.hand.length===0){
//             addToStack({source:'',target:'',})
//         }
//     }
// }
// const bottledLuck={
//     play:()=>{
//         addToStack(draw)
//     },
//     pitch:()=>{
//         if(gameState.p1.hand.length===0){
//             addToStack({source:'',target:'',})
//         }
//     }
// }
