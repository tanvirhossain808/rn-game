import { useWindowDimensions } from "react-native";
import React from "react";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useFrameCallback,
} from "react-native-reanimated";
import { ballSpeed, boarderHeight } from "@/constant";
import { useGameContext } from "@/GameContext";

export default function Ball() {
  const { width } = useWindowDimensions();
  const { ball, isUserTurn, onEndTurn } = useGameContext();

  const ballStyles = useAnimatedStyle(() => {
    const { x, y, r } = ball!.value;
    return {
      left: x - r,
      top: y - r,
      width: r * 2,
      aspectRatio: 1,
      backgroundColor: "white",
      borderRadius: r,
      position: "absolute",
      // top:x.value*2
    };
  });
  const frameCallback = useFrameCallback((frameInfo) => {
    const delta = (frameInfo.timeSincePreviousFrame || 0) / 1000;
    // console.log(delta);

    let { x, y, dx, dy, r } = ball!.value;
    x += dx * delta * ballSpeed;
    y += dy * delta * ballSpeed;
    if (y < r) {
      dy *= -1;
      y = r;
    }
    if (y > boarderHeight - r) {
      // dy *= -1;
      y = boarderHeight - r;
      onEndTurn();
    }
    if (x > width - r) {
      dx *= -1;
      x = width - r;
    }
    if (x < r) {
      dx *= -1;
      x = r;
    }
    ball!.value = { ...ball!.value, x, y, dy, dx };
  }, false);
  const startFrameCallback = (val: boolean) => {
    frameCallback.setActive(val);
  };
  useAnimatedReaction(
    () => isUserTurn!.value,
    (val) => runOnJS(startFrameCallback)(!val)
  );
  return <Animated.View style={[ballStyles]}></Animated.View>;
}
