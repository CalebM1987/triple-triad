import { OneOrTwo } from "@/modules/rng/random"

type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' |  'unshift'
export type FixedLengthArray<T, L extends number, TObj = [T, ...Array<T>]> =
  Pick<TObj, Exclude<keyof TObj, ArrayLengthMutationKeys>>
  & {
    readonly length: L; 
    [ I: number ]: T;
    [Symbol.iterator]: () => IterableIterator<T>; 
  }

export type CardType = 
  | "Level 1 Monster"
  | "Level 2 Monster"
  | "Level 3 Monster"
  | "Level 4 Monster"
  | "Level 5 Monster"
  | "Level 6 Boss"
  | "Level 7 Boss"
  | "Level 8 GF"
  | "Level 9 GF"
  | "Level 10 Player"
  | "Level 11 Final Boss"
  | "Level 12 Super Boss"

export type Elemental = 
  | "fire"
  | "water"
  | "ice"
  | "lightning"
  | "wind"
  | "earth"
  | "poison"
  | "holy"

export type CardSide = 
  | "top"
  | "right"
  | "bottom"
  | "left"

export interface IAdjacentCardRelationship {
  cell: GridCellNumber;
  /** the side that is can attack adjacent card  */
  side: CardSide;
  /** the side of the adjacent card that can be attacked */
  opponentSide: CardSide;
}

export interface ICard {
  /** unique ID */
  id: number;
  /** triple triad card id */
  cardNumber: number;
  /** top side value */
  top: number;
  /** right side value */
  right: number;
  /** bottom side value */
  bottom: number;
  /** left side value */
  left: number;
  /** label */
  label: string;
  /** card type */
  type: CardType;
  /** path to image */
  image: string;
  /** elemental if applicable */
  elemental?: Elemental | undefined;
}

export type GridCellNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type CardHand = FixedLengthArray<ICard,5>

export interface IBasePlayer {
  /** the players id */
  id: number;
  username?: string;
  name?: string;
  email?: string;
}

export interface IPlayer extends IBasePlayer {
  /** the player order on the board (1|2) */
  order: OneOrTwo;
  /** the player's card hand */
  hand?: CardHand;
}
  
export interface ICardInPlay {
  card?: ICard;

  player?: IPlayer;

  directOwner?: OneOrTwo;

  captured: boolean;

  cell: GridCellNumber;

  elementalOffset?: number;
}

export type TriadBoardGrid = Record<GridCellNumber,ICardInPlay>

export type AvailableAdjacentCards = Record<GridCellNumber,IAdjacentCardRelationship[]>