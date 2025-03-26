import {
  Button,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { ballRadius, blockW, boarderHeight } from "@/constant";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useFrameCallback,
  withTiming,
  withSpring,
  withDecay,
  Easing,
  withSequence,
  withRepeat,
  withDelay,
} from "react-native-reanimated";
import { BallData, BlockData } from "@/types";
import Ball from "./Ball";
import { GameContext, useGameContext } from "@/GameContext";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Block from "./Block";
import { generateBlockRows } from "@/utils";

const Game = () => {
  const { width } = useWindowDimensions();
  // const moveBall = () => {
  //   // x.value=withDecay({velocity:300})
  //   // x.value=withTiming(x.value+100,{duration:1000,easing:Easing.bounce})
  //   // x.value=withRepeat(withSequence(
  //   //   withTiming(150),
  //   //   withTiming(120),
  //   //   withTiming(150)
  //   // ),-1)
  //   ball.value.x = withDelay(
  //     1000,
  //     withSequence(withTiming(150), withTiming(120), withTiming(150))
  //   );
  // };
  const ball = useSharedValue<BallData>({
    x: width / 2,
    y: boarderHeight - ballRadius,
    r: ballRadius,
    dx: -1,
    dy: -1,
  });
  const isUserTurn = useSharedValue(true);

  const onEndTurn = () => {
    "worklet";
    if (isUserTurn.value) {
      return;
    }
    isUserTurn.value = true;
  };
  const pan = Gesture.Pan()
    .onUpdate((e) => {
      if (!isUserTurn.value) {
        return;
      }
      const x = e.translationX;
      const y = e.translationY;
      const mag = Math.sqrt(x * x + y * y);
      // const { dx, dy }
      // console.log(mag, dx, dy);
      ball.value = {
        ...ball.value,
        dx: -x / mag,
        dy: -y / mag,
      };
    })
    .onEnd(() => {
      if (ball.value.dy < 0) {
        isUserTurn.value = false;
      }
    });
  const pathStyle = useAnimatedStyle(() => {
    const { x, y, dx, dy } = ball.value;
    const angle = Math.atan2(-dx, dy);
    return {
      display: isUserTurn.value ? "flex" : "none",
      top: y,
      left: x,
      transform: [{ rotate: `${angle}rad` }],
    };
  });
  const blocks = useSharedValue<BlockData[]>(
    Array(3)
      .fill(0)
      .flatMap((_, row) => generateBlockRows(row + 1))
  );
  return (
    <GameContext.Provider value={{ ball, isUserTurn, onEndTurn, blocks }}>
      <GestureDetector gesture={pan}>
        <SafeAreaView style={style.container}>
          <View style={style.board}>
            {blocks.value.map((block, index) => (
              <Block index={index} key={index} />
            ))}
            {/* <Block block={block} /> */}
            <Ball />
            <Animated.View
              style={[
                {
                  width: 0,
                  height: 1000,
                  borderWidth: 1,
                  borderColor: "#ffffff99",
                  borderStyle: "dotted",
                  left: 50,
                  position: "absolute",
                  transformOrigin: "top-center",
                },
                pathStyle,
              ]}
            ></Animated.View>
          </View>
          <Button
            onPress={() => {
              isUserTurn.value = false;
            }}
            title="Move"
          ></Button>
        </SafeAreaView>
      </GestureDetector>
    </GameContext.Provider>
  );
};

export default Game;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#292929",
  },
  board: {
    backgroundColor: "#202020",
    height: boarderHeight,
    marginVertical: "auto",
    overflow: "hidden",
  },
});

// CommandError: Network connection is unreliable. Try again with the environment variable `EXPO_OFFLINE=1` to
// skip network requests.
