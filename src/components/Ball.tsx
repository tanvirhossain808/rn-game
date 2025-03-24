import { useWindowDimensions } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useFrameCallback,
} from "react-native-reanimated";
import { ballSpeed, boarderHeight } from "@/constant";
import { useGameContext } from "@/GameContext";

export default function Ball() {
  const { width } = useWindowDimensions();
  const { ball } = useGameContext();

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
  useFrameCallback((frameInfo) => {
    const delta = (frameInfo.timeSincePreviousFrame || 0) / 1000;
    // console.log(delta);
    let { x, y, dx, dy, r } = ball!.value;
    x += dx * delta * ballSpeed;
    y += dy * delta * ballSpeed;
    if (y < r) {
      dy *= -1;
    }
    if (y > boarderHeight - r) {
      dy *= -1;
    }
    if (x > width - r) {
      console.log(x, width, "right");
      dx *= -1;
      x = width - r;
    }
    if (x < r) {
      console.log(x, "left");
      dx *= -1;
      x = r;
    }
    ball!.value = { ...ball!.value, x, y, dy, dx };
  });
  return <Animated.View style={[ballStyles]}></Animated.View>;
}
