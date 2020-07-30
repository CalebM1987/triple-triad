import { ICardInPlay, ICard, IAdjacentCardRelationship, GridCellNumber, TriadBoardGrid } from '@/types/common'
import { ADJACENT_SLOTS, EXPOSED_SIDES} from './layout'

export function updateTriadBoard(grid: TriadBoardGrid, laidCard: ICardInPlay, rules: string[]=[]): TriadBoardGrid {
  console.log('UPDATING BOARD WITH RULES: ', rules)
  console.log('laid card is: ', laidCard)

  const adjacentSlots = ADJACENT_SLOTS[laidCard.cell]
  for (const slot of adjacentSlots){
    console.log(`checking adjacent slot for laid card @ ${laidCard.cell} @ adjacent slot ${slot.cell}`)
    // query the adjacent cell 
    const gameCell = grid[slot.cell]

    // check to see if there is an opponent's card
    if (gameCell.card && gameCell.player){
      
      // TODO: handle captured and recaptured state
      if (gameCell.directOwner !== laidCard.player!.order){ 
        // check if we can capture oponent card
        console.log(`FOUND OPPONENT CARD FOR ${laidCard!.card!.label}: ${gameCell!.card!.label} at cell ${gameCell.cell}`)
  
        // change directOwner if we can take the card
        if (laidCard!.card![slot.side] > gameCell!.card![slot.opponentSide]){
          gameCell.directOwner = laidCard.player!.order
        }
        
        // set captured flag if necessary (direct owner is not the original card owner)
        gameCell.captured = gameCell.directOwner !== gameCell.player.order
        if (gameCell.captured){
          console.log('CAPTURED CARD!')
        }
      } 
      // else {
      //   // this is the same players card?
      //   if (gameCell.captured){
      //     // uncapture if we can take it back
      //     gameCell.captured = laidCard!.card![slot.side] > gameCell!.card![slot.opponentSide]
      //     if (!gameCell.captured){
      //       console.log(`player ${gameCell.player} took back their ${gameCell.card.label} card!`)
      //     }
      //   }
      // }
    }

  }

  return grid
}