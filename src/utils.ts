import { BallData, BlockData } from "./types";
import { blockPerRow, blockW } from "@/constant";
export const generateBlockRows = (row: number) => {
  "worklet";
  const block: BlockData[] = [];
  for (let col = 0; col < 8; col++) {
    const shouldAdd = Math.random() < 0.6;
    if (shouldAdd) {
      block.push({
        x: col * (blockW + 10) + 5,
        y: row * (blockW + 10) + 5,
        w: blockW,
        val: 1,
      });
    }
  }
  return block;
};

export const checkCollision = (ball: BallData, block: BlockData): boolean => {
  "worklet";
  //checking the block boundaries
  const blockRight = block.x + block.w;
  const blockBottom = block.y + block.w;

  //find the closer point to the ball within the block
  const closerX = Math.max(block.x, Math.min(ball.x, blockRight));
  const closerY = Math.max(block.y, Math.min(ball.y, blockBottom));

  //calculate the distance the ball's center to the closet point
  const distanceX = ball.x - closerX;
  const distanceY = ball.y - closerY;

  //return true if the distance is less than the radius of the ball
  const distanceSquared = distanceX * distanceX * distanceY * distanceY;
  return distanceSquared < ball.r * ball.r;
};

export const getResetPositionAndDirection = (
  ball: BallData,
  block: BlockData
): BallData | null => {
  "worklet";
  if (!checkCollision(ball, block)) return null;

  const blockRight = block.x + block.w;
  const blockBottom = block.y + block.w;

  let newDx = ball.dx;
  let newDy = ball.dy;
  const r = ball.r;
  if (Math.abs(ball.y - block.y) < ball.r && ball.dy > 0) {
    newDy = -ball.dy;
    return {
      x: ball.x,
      y: block.y - ball.r,
      dx: newDx,
      dy: newDy,
      r,
    };
  } else if (Math.abs(ball.y - blockBottom) < ball.r && ball.dy < 0) {
    newDy = -ball.dy;
    return {
      x: ball.x,
      y: blockBottom + ball.r,
      dx: newDx,
      dy: newDy,
      r,
    };
  } else if (Math.abs(ball.x - block.x) < ball.r && ball.dx > 0) {
    newDx = -ball.dx;
    return {
      x: block.x - ball.r,
      y: ball.y,
      dx: newDx,
      dy: newDy,
      r,
    };
  } else if (Math.abs(ball.x - blockRight) < ball.r && ball.dx < 0) {
    newDx = -ball.dx;
    return {
      x: blockRight + ball.r,
      y: ball.y,
      dx: newDx,
      dy: newDy,
      r,
    };
  }
  return null;
};
