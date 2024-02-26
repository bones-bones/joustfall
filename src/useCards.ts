import { useEffect, useState } from "react";
import { SpellCard } from "./types";

import { toDeck } from "./deck-maker/toDeck";
import { local } from "./local";
import { dumbMappings } from "./deck-maker/dumbMappings";

export const useCards = () => {
  const [cards, setCards] = useState<SpellCard[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://sheets.googleapis.com/v4/spreadsheets/1blTnmsPwc9zLU3tK8JbC0eYMN_rUuLb5-jU_1SiyVCg/values/BaseSet?alt=json&key=AIzaSyD5G8zjJvE9ZCbv-xE44qqqozUyDvu7GGI"
      );

      const asText = (
        (await response.json()) as {
          values: [string, string, string, string, string, string, string][];
        }
      ).values;

      const [titles, ...rest] = asText;

      const cardObject = rest.map((entry) => {
        const singleCard = titles.reduce((prev, curr, i) => {
          return {
            ...prev,
            [curr]: entry[i],
          };
        }, {} as SpellCard);

        return {
          ...singleCard, // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          Image: dumbMappings[entry[0]],
        };
      });

      const classes = await fetch(
        "https://sheets.googleapis.com/v4/spreadsheets/1blTnmsPwc9zLU3tK8JbC0eYMN_rUuLb5-jU_1SiyVCg/values/Schools?alt=json&key=AIzaSyD5G8zjJvE9ZCbv-xE44qqqozUyDvu7GGI"
      );

      const parsedClasses = (
        (await classes.json()) as { values: [string, string, string][] }
      ).values.slice(1);

      const asSpellCards = parsedClasses.map((entry) => {
        return {
          Name: entry[0],
          School: entry[1],
          Subtypes: "Class",
          Pitch: "",
          Cost: "",
          Text: entry[2],
          Stability: "",
          Rarity: "",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          Image: dumbMappings[entry[0]],
          "Collector Info": "",
        } as any as SpellCard;
      });

      setCards([...asSpellCards, ...cardObject]);
    })();
  }, []);

  return cards;
};
