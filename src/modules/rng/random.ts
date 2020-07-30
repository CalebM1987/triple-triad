import { Random, MersenneTwister19937 } from 'random-js'

const random = new Random(MersenneTwister19937.autoSeed())

export type OneOrTwo = 
  | 1
  | 2

export function simpleChoice(): OneOrTwo {
  return random.integer(1, 100) < 50 ? 1: 2 
}

