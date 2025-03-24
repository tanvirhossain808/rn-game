import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { ballRadius, ballSpeed, boarderHeight } from "@/constant";
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
import { BallData } from "@/types";
import Ball from "./Ball";
import { GameContext, useGameContext } from "@/GameContext";

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
  const { ball: ballContext } = useGameContext();
  // console.log(ballContext, "conttext",ball);
  return (
    <GameContext.Provider value={{ ball }}>
      <SafeAreaView style={style.container}>
        <View style={style.board}>
          <Ball />
        </View>
        <Button
          onPress={() => {
            ball;
          }}
          title="Move"
        ></Button>
      </SafeAreaView>
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
