import { atom } from "jotai";
import { GlobalAction } from "./types";

export const stackAtom = atom<GlobalAction[]>([]);
