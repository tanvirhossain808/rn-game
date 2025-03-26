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
import { getResetPositionAndDirection } from "@/utils";

export default function Ball() {
  const { width } = useWindowDimensions();
  const { ball, isUserTurn, onEndTurn, blocks } = useGameContext();

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

    //check coalition with the blocks
    blocks?.modify((blocks) => {
      blocks
        .filter((block) => block.val > 0)
        .forEach((block) => {
          const newBallData = getResetPositionAndDirection(ball!.value, block);
          if (newBallData) {
            ball!.value = newBallData;
            block.val -= 1;
          }
        });
      return blocks;
    });
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
