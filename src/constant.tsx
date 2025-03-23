import { Dimensions } from "react-native";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const ballRadius=5
export const ballSpeed=500
export const boarderHeight=500
export const blockPerRow=7
export const blockW=width/blockPerRow-10
