<template>
  <div class="triad-stack p-4 h-100 d-flex">
  
      <div class="stacked-card mx-auto" 
        v-for="(card, index) in cards"
        :key="index"
        :class="[side === 'right' ? 'right': 'left', discarded.includes(card.id) ? 'card-hide': '']"
        :style="{'z-index': 10 }"
      >
        <draggable 
          :list="[card]"
          :group="{name: 'cards', pull: true, put: false}"
          :disabled="!dragEnabled"
          @start="drag=true" 
          @end="finishTurn" 
          :move="removeFromStack" 
          :id="card.id">

          <!-- card goes here -->
          <triad-card 
            :card="card" 
            :playerOrder="player.order"
            v-show="!discarded.includes(card.id)"
          ></triad-card>
        </draggable>
      </div>
  
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { Mutation, State } from 'vuex-class'
  import { delay } from '@/modules/utils'
  import draggable from 'vuedraggable'
  import { IPlayer } from '../../types/common'
  import { updateHook } from '@/modules/dev-hooks'

  type StackSide = 
    | 'left'
    | 'right'

  @Component({
    components: {
      draggable,
      TriadCard: ()=> import('./TriadCard.vue')
    }
  })
  export default class CardStack extends Vue {
    @Prop() cards: ICard[]
    @Prop({ default: 1 }) player: IPlayer
    @Prop({ default: true }) dragEnabled: boolean

    @State('player1', { namespace: 'gameplay' }) player1: IPlayer
    @State('player2', { namespace: 'gameplay' }) player2: IPlayer
    @Mutation('gameplay/setActivePlayer') setActivePlayer: Function

    drag = false
    discarded: number[] = []

    mounted(){
      updateHook({ stack: this });
      console.log('CARD STACK CARDS: ', this.cards)
    }

    showStackChange(e: any){
      console.log('STACK CHANGED: ', this.player, e)
    }

    removeFromStack(evt: any){
      console.log('remove from stack? ', evt)
      const card = this.cards.find(c => c.id == evt.from.id)
      this.discarded.push(card!.id)
    }

    finishTurn(){
      this.drag = false
      console.log(`completed turn for player "${this.player.order}", setting active player?`, this.player.order == 1 ? 2: 1)
      delay(100).then(()=> this.setActivePlayer(this.player.order == 1 ? this.player2: this.player1))
    }

    get side(): StackSide {
      return this.player === 1 ? 'left': 'right'
    }

    get availableCards(): ICard[] {
      return this.cards.filter(c => !this.discarded.includes(c.id))
    }

  }

</script>

<style lang="scss">

  .triad-stack {
    display: flex;
    flex-direction: column;
    --distance: 7rem;
    --distance-sm: 5.5rem;
    border: solid 2px lightgray;
    border-radius: 12px;
    flex-direction: column;
    align-content: space-around;
    // background-color: rgb(202, 218, 65)
  }

  .stacked-card {
    width: 250px;
    border-radius: 1rem;
    transition: 0.2s;
    &:not(:first-child) {
      margin-top: var(--distance);
    }
  }

  .stacked-card.right:hover,
  .stacked-card.right:focus-within {
    /** when on right slide to the left */
    transform: translateX(-4rem);
    z-index: 100;
  }

  .stacked-card.left:hover,
  .stacked-card.left:focus-within {
    /** when on left slide to the right */
    transform: translateX(4rem);
    z-index: 100;
  }

  .stacked-card:hover ~ .stacked-card,
  .stacked-card:focus-within ~ .stacked-card {
    transform: translateY(calc(var(--distance-sm)));
  }

  .card-hide {
    height: 3px;
  }

</style>