import { createContext, useContext } from "react";
import { SharedValue } from "react-native-reanimated";
import { BallData, BlockData } from "@/types";

export const GameContext = createContext<{
  ball?: SharedValue<BallData>;
  isUserTurn?: SharedValue<boolean>;
  blocks?: SharedValue<BlockData[]>;
  onEndTurn: () => void;
}>({ onEndTurn: () => {} });

export const useGameContext = () => useContext(GameContext);
