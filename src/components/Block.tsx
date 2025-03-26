import Animated, {
  useAnimatedStyle,
  SharedValue,
} from "react-native-reanimated";
import { BlockData } from "@/types";
import { useGameContext } from "@/GameContext";

export default function Block({ index }: { index: number }) {
  const { blocks } = useGameContext();
  const style = useAnimatedStyle(() => {
    const block = blocks!.value[index];
    if (!block || block.val <= 0) {
      return {
        display: "none",
      };
    }
    const { w, x, y, val } = blocks!.value[index];

    return {
      width: w,
      height: w,
      position: "absolute",
      top: y,
      left: x,
      backgroundColor: "#f5b52f",
    };
  });
  return <Animated.View style={style}></Animated.View>;
}
