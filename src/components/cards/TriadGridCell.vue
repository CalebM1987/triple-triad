<template>
  <div class="grid-cell p-1" @hover="$emit('cell-hover', cell)"> 
    <div v-if="!cards.length">
        <draggable 
          :id="cell"
          :list="cards"
          :group="'cards'"
          @start="drag=true"
          @end="drag=false"
        >
        <div class="card-slot"></div>
      </draggable> 
      
    </div>

    <div class="laid-card" v-else>
      <triad-card 
        :card="card"
        :playerOrder="player.order"
        :captured="captured"
      ></triad-card>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import { Mutation, State } from 'vuex-class'
  import draggable from 'vuedraggable'
  import { OneOrTwo } from '../../modules/rng/random'

  @Component({
    components: {
      draggable,
      TriadCard: ()=> import('./TriadCard.vue')
    }
  })
  export default class TriadGridCell extends Vue {
    @Prop({ required: true }) cell: number
    @Prop({ default: false }) captured: boolean

    @State('activePlayer', { namespace: 'gameplay' }) activePlayer: OneOrTwo

    @Mutation('gameplay/setActivePlayer') setActivePlayer: Function
    // @Prop({ required: true, default: false}) captured: boolean
    cards: ICard[] = []
    drag = false
    player = 1

    mounted(){
      this.$hook[`cell${this.cell}`] = this
      console.log('mounted grid cell: ', this.cell, this)
    }

    get card(): ICard {
      return this.cards[0]
    }

    get count(): number {
      return this.cards.length
    }

    receiveCard(evt: any){
      console.log('RECEIVED CARD IN CELL: ', this.cell, evt)
    }

    @Watch('cards', { deep: true })
    onCardsChanged(cards: ICard[]){
      console.log(`cards changed in cell ${this.cell}: `, cards, this.activePlayer)
      
      this.player = this.activePlayer
      this.$emit('card-in-play', { player: this.player, card: this.cards[0], cell: this.cell })
    }

  }

</script>

<style lang="scss">
  .card-slot {
    height: 200px;
    width: 200px;
  }

</style>