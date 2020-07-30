import { IAdjacentCardRelationship, GridCellNumber } from '@/types/common'

export const EXPOSED_SIDES = {
  1: ['right', 'bottom'],
  2: ['left', 'right', 'bottom'],
  3: ['left', 'bottom'],
  4: ['top', 'right', 'bottom'],
  5: ['left', 'top', 'right', 'bottom'],
  6: ['left', 'top', 'bottom'],
  7: ['top', 'right'],
  8: ['left', 'top', 'right'],
  9: ['left', 'top']
}

export const ADJACENT_SLOTS: Record<GridCellNumber,IAdjacentCardRelationship[]> = {
  1: [ 
    { cell: 2, side: 'right', opponentSide: 'left' },
    { cell: 4, side: 'bottom', opponentSide: 'top' }
  ],
  2: [
    { cell: 1, side: 'left', opponentSide: 'right' },
    { cell: 3, side: 'right', opponentSide: 'left' },
    { cell: 5, side: 'bottom', opponentSide: 'top' }
  ],
  3: [
    { cell: 2, side: 'left', opponentSide: 'right' },
    { cell: 6, side: 'bottom', opponentSide: 'top' }
  ],
  4: [
    { cell: 1, side: 'top', opponentSide: 'bottom' },
    { cell: 5, side: 'right', opponentSide: 'left' },
    { cell: 7, side: 'bottom', opponentSide: 'top' },
  ],
  5: [
    { cell: 2, side: 'top', opponentSide: 'bottom' },
    { cell: 4, side: 'left', opponentSide: 'right' },
    { cell: 6, side: 'right', opponentSide: 'left' },
    { cell: 8, side: 'bottom', opponentSide: 'top' },
  ],
  6: [
    { cell: 3, side: 'top', opponentSide: 'bottom' },
    { cell: 5, side: 'left', opponentSide: 'right' },
    { cell: 9, side: 'bottom', opponentSide: 'top' }
  ],
  7: [
    { cell: 4, side: 'top', opponentSide: 'bottom' },
    { cell: 8, side: 'right', opponentSide: 'left' }
  ],
  8: [
    { cell: 7, side: 'left', opponentSide: 'right' },
    { cell: 5, side: 'top', opponentSide: 'bottom' },
    { cell: 9, side: 'right', opponentSide: 'left' },
  ],
  9: [
    { cell: 6, side: 'top', opponentSide: 'bottom' },
    { cell: 8, side: 'left', opponentSide: 'right' },
  ]
}
