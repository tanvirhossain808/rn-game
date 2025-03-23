import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { boarderHeight } from '@/constant'
import Animated, { useSharedValue,useAnimatedStyle,withTiming,withSpring,withDecay } from 'react-native-reanimated'

const Game = () => {
  const x=useSharedValue(1)
  const moveBall=()=>{
    x.value=withDecay({velocity:300})
  }
  const ballStyles=useAnimatedStyle(()=>{
    return{
      left:x.value*2,
      top:x.value*2
    }
  })
  return (
    <SafeAreaView style={style.container}>
      <View style={style.board}>
        <Animated.View style={[{width:50,height:50,backgroundColor:"white",borderRadius:50,position:"absolute",top:boarderHeight/2},ballStyles]}>
        </Animated.View>
      </View>
      <Button onPress={moveBall} title='Move'>
    
      </Button>
    </SafeAreaView>
  )
}

export default Game

const style=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#292929"
  },
  board:{
    backgroundColor:"#202020",
    height:boarderHeight,
    marginVertical:"auto",
    overflow:"hidden"
  }
})