<template>
  <div class="card-game">
    <b-container fluid class="p-3">
      <b-row>
        <b-col md="3" align-h="center">
          <div class="player-1-container">
            <div class="player-header">
              <h4 :class="isPlayer1Turn ? 'selected-player': ''">Player 1 ({{ player1Score }})</h4>
            </div>
            <card-stack 
              v-if="player1HasSetHand"
              :cards="player1.hand"
              :player="player1"
              :dragEnabled="isPlayer1Turn"
          ></card-stack>
        </div>
        </b-col>

        <b-col md="6" align-h="center">
          <triad-board ref="triadBoard" @updated-board="updateScore"></triad-board>
        </b-col>

        <b-col md="3" align-h="center">
          <div class="player-2-container">
            <div class="player-header">
              <h4 :class="isPlayer2Turn ? 'selected-player': ''">Player 2 ({{ player2Score }})</h4>
            </div>
            <card-stack 
              v-if="player2HasSetHand"
              :cards="player2.hand" 
              :player="player2"
              :dragEnabled="isPlayer2Turn"
              ></card-stack>
          </div>
        </b-col>

      </b-row>
    </b-container>
  
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator'
import { State, Mutation, Getter, Action } from 'vuex-class'
import TriadCard from '@/components/cards/TriadCard.vue'
import CardStack from '@/components/cards/CardStack.vue'
import TriadBoard from '@/components/cards/TriadBoard.vue'
import { sampleCards } from '@/data/cards'
import { OneOrTwo } from '@/modules/rng/random'
// import { sample } from 'random-js'
import { TriadBoardGrid, ICardInPlay, IPlayer } from '@/types/common'

@Component({
    components: {
     TriadCard,
     CardStack,
     TriadBoard
    }
  })
export default class CardGame extends Vue {
  @State('activePlayer', { namespace: 'gameplay'}) activePlayer: IPlayer
  @State('player1', { namespace: 'gameplay' }) player1: IPlayer
  @State('player2', { namespace: 'gameplay' }) player2: IPlayer
  @Getter('gameplay/player1HasSetHand') player1HasSetHand: boolean
  @Getter('gameplay/player2HasSetHand') player2HasSetHand: boolean
  @Mutation('gameplay/setPlayer') setPlayer: Function
  @Mutation('gameplay/setPlayerTurn') setPlayerTurn: Function
  @Mutation('gameplay/setPlayerHand') setPlayerHand: Function
  @Action('gameplay/choosePlayer') choosePlayer: Function

  // // data
  player1Score = 5
  player2Score = 5
  
  mounted(){
    this.$hook.game = this
    this.setPlayer({
      order: 1,
      id: 1,
      username: 'cid101',
    })
    this.setPlayer({
      order: 2,
      id: 7,
      username: 'crmackey',
    })

    this.setPlayerHand({ player: 1, cards: sampleCards.slice(0, 5) })
    this.setPlayerHand({ player: 2, cards: sampleCards.slice(5) })
    this.choosePlayer()
  }

  updateScore(grid: TriadBoardGrid){
    const player1Points = Object.values(grid).filter((c: ICardInPlay) => c.directOwner == 1 && c.player!.order == 2).length
    const player2Points = Object.values(grid).filter((c: ICardInPlay) => c.directOwner == 2  && c.player!.order == 1).length
    console.log('PLAYER 1 AND 2 POINTS on update: ', player1Points, player2Points)

    this.player1Score = 5 + player1Points - player2Points
    this.player2Score = 5 + player2Points - player1Points
  }

  get isPlayer1Turn(){
    return this.activePlayer ? this.activePlayer.order == 1: false
  }

  get isPlayer2Turn(){
    return this.activePlayer ? this.activePlayer.order == 2: false
  }
}
</script>

<style lang="scss">

  .card-game {
    // background-color: #EAC38B;
    background-image: linear-gradient(to right, #3B1D00, #977049, #E3AF6F, #E9ECBD, #D19B59, #966A41, #612400);
    // background-image: url('http://localhost:8080/img/board/triple_triad.png');
    // background-size: 90%;
  }

  .selected-player {
    line-height: 1;
    border-bottom: 2px solid red;
    display: inline-block;
    line-height: 0.85;
  }
  
</style>
