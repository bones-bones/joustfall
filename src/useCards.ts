import { useEffect, useState } from "react";
import { Class, SpellCard, Token } from "./types";

import { dumbMappings } from "./deck-maker/dumbMappings";
import { atom, useSetAtom } from "jotai";

export const useCards = () => {
  const [cards, setCards] = useState<(SpellCard | Class | Token)[]>([]);
  const setTokens = useSetAtom(tokenAtom);
  useEffect(() => {
    (async () => {
      const everything = await (
        await fetch(
          "https://sheets.googleapis.com/v4/spreadsheets/1BOOJZbtZ21rXp1WceTI6QaL-XRJ51grVHXMDqJM-KXE/values/allwjcard?alt=json&key=AIzaSyD5G8zjJvE9ZCbv-xE44qqqozUyDvu7GGI"
        )
      ).json();

      console.log({ everything });

      const slicedResponse = everything.values.slice(1) as string[][];

      const tokensFromMain = slicedResponse.filter(
        (entry) => entry[22] === "token"
      );
      const classFromMain = slicedResponse.filter(
        (entry) => entry[22] === "class"
      );
      const spellFromMain = slicedResponse.filter(
        (entry) => entry[22] === "spell"
      );

      const spellCards = spellFromMain.map((entry) => {
        const cardToReturn: SpellCard = {
          Cost: parseInt(entry[5]),
          Name: entry[1],
          Pitch: entry[4] !== "" ? parseInt(entry[4]) : null,
          Rarity: entry[9],
          Class: entry[2],
          Stability: parseInt(entry[8]),
          Text: entry[6],
          Types: entry[3],
          "Collector Info": entry[10],
          // @ts-ignore
          Image: dumbMappings[entry[1]],
        };
        return cardToReturn;
      });

      const classCards = classFromMain.map((entry) => {
        const classCard: Class = {
          Name: entry[11],
          Class: entry[12],
          Types: "Class",
          "Collector Info": entry[15],
          Text: entry[14],

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          Image: dumbMappings[entry[11]],
        };
        return classCard;
      });

      const tokenCards = tokensFromMain.map((entry) => {
        const tokenCard: Token = {
          Name: entry[16],
          Class: entry[17],
          Types: entry[18],
          Pitch: parseInt(entry[19]),
          Text: entry[20],
          Cost: null,
          Stability: parseInt(entry[21]),

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          Image: dumbMappings[entry[16]],
        };
        return tokenCard;
      });

      setCards([...classCards, ...spellCards]);
      setTokens(tokenCards);
    })();
  }, []);

  return cards;
};

export const tokenAtom = atom<Token[]>([]);
