import { atom } from "jotai";
import { cardImpl } from "./cardImpl";
import {
  Create,
  DamagePayload,
  GameAction,
  GameSpellObject,
  SelectTarget,
} from "./types";
import { stackAtom } from "./stackAtom";

// type, id, controller

export const gameAtom = atom(
  (get) => {
    return {
      p1: get(p1LifeAtom),
      stack: get(stackAtom),
      field: get(fieldAtom),
    };
  },
  (get, set, input: AnyAction) => {
    console.log(`incoming action: ${input.action}`, input);

    const log = (text: string) => {
      set(gameLog, [...get(gameLog), text]);
    };

    switch (input.action) {
      case "EndOfTurn": {
        set(gameLog, [...get(gameLog), "It is the end of the turn"]);
        const field = get(fieldAtom);

        const possibleTriggers = field
          .map((entry) => cardImpl[entry.type]?.endOfTurn?.({ field }))
          .filter(Boolean);

        log(
          `${
            possibleTriggers.length
          } triggers entering the stack: ${possibleTriggers.map(
            (entry: any) => `${entry.amount} ${entry.action} to ${entry.target}`
          )}`
        );
        if (possibleTriggers[0]) {
          gameAtom.write(get, set, possibleTriggers[0]);
        }

        break;
      }
      case "selectTarget": {
        const casted = input as SelectTarget;
        log(`Choose a target for ${casted.source!.type}'s ability`);

        set(stackAtom, [
          ...get(stackAtom),
          {
            action: "selectTarget",
            nextAction: casted.nextAction,
            targets: casted.validTargetSelector({
              field: get(fieldAtom),
              thisThing: casted.source!,
            }),
          } as any,
        ]);
        break;
      }
      case "startOfGame": {
        set(gameLog, [...get(gameLog), "Starting the game"]);
        const field = get(fieldAtom);

        const possibleTriggers = field
          .map((entry) => cardImpl[entry.type]?.startOfGame?.({ field }))
          .filter(Boolean);

        log(
          `${
            possibleTriggers.length
          } triggers entering the stack: ${possibleTriggers.map(
            (entry: any) =>
              `${entry.action} ${entry.objects.length}: [${entry.objects.map(
                (ee: any) => ee.type
              )}]`
          )}`
        );
        if (possibleTriggers[0]) {
          gameAtom.write(get, set, possibleTriggers[0]);
        }

        break;
      }
      case "damageWouldBeDealt": {
        log(
          `${(input as any).amount} damage will be dealt to ${
            (input as any).target
          }`
        );

        const possibleTriggers = get(fieldAtom)
          .map((entry) =>
            cardImpl[entry.type]?.damageWouldBeDealt?.({
              ...input,
              source: entry,
              field: get(fieldAtom),
            } as GameAction<DamagePayload>)
          )
          .filter(Boolean);

        if (possibleTriggers[0]) {
          gameAtom.write(get, set, possibleTriggers[0]);
        } else {
          gameAtom.write(get, set, {
            ...input,
            action: "dealDamage",

            field: get(fieldAtom),
          } as any);
        }
        // deal damage event.
        //

        break;
      }
      case "create": {
        const casted = input as Create;

        const thingsToAdd = casted.objects.map<GameSpellObject>((entry) => {
          return {
            controller: (entry as any).owner == "self" ? "p1" : "p2",
            type: entry.type,
            id: Math.random().toString(),
          };
        });

        set(fieldAtom, [...get(fieldAtom), ...thingsToAdd]);

        // TODO: etb effects. Either launch from here or in fieldAtom
        break;
      }
    }

    if (input.action === "1 damage") {
      //
    }
  }
);

type AnyAction = { action: any };
type StackAdd = { action: "addToStack"; payload: any };

export const p1LifeAtom = atom(1);

export const gameLog = atom<string[]>([]);

export const fieldAtom = atom<GameSpellObject[]>([
  {
    id: "Lich",
    type: "Lich",
    controller: "Lich",
  },
  {
    id: "druid",
    type: "Druid",
    controller: "p1",
  },
]);
