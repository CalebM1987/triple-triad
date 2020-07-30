import { VuexModule, Module, Mutation, Action } from "vuex-class-modules"
import { simpleChoice, OneOrTwo } from '@/modules/rng/random'
import { IPlayer , FixedLengthArray, ICard, CardHand} from '@/types/common'

@Module 
export class GameplayState extends VuexModule {

  // state
  player1?: IPlayer = undefined
  player2?: IPlayer = undefined

  activePlayer?: IPlayer = undefined

  get player1HasSetHand(): boolean {
    return this.player1 ? (this.player1.hand || []).length === 5: false
  }

  get player2HasSetHand(): boolean {
    return this.player2 ? (this.player2.hand || []).length === 5: false
  }
  
  @Mutation
  setPlayerHand({ player, cards }: {player: OneOrTwo; cards: CardHand}) {
    console.log('setting player hand: ', `player${player}Cards`, cards)
    this[`player${player}`].hand = cards
  }
 
  @Mutation
  setPlayer(player: IPlayer) {
    console.log('SETTING PLAYER: ', player)
    this[`player${player.order}`] = player
  }

  @Mutation
  setActivePlayer(player: IPlayer): void{
    console.log('SETTING ACTIVE PLAYER: ', player)
    this.activePlayer = player
  }

  @Action
  choosePlayer() {
    const order = simpleChoice()
    this.setActivePlayer(order === 1 ? this.player1: this.player2)
  }
}