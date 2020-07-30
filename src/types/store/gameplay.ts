import { OneOrTwo } from '@/modules/rng/random';
import { ICard } from '../common'

/** gameplay state */
export interface IGameplayState {
  /** the active player (it is this player's turn) */
  activePlayer: OneOrTwo;

}