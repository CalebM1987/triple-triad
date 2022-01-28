<template>
  <div class="triad-board">
    <div class="card-row d-flex justify-content-center" v-for="row in 3" :key="row">
      <triad-grid-cell 
        v-for="col in 3" 
        :key="col" 
        :cell="((row-1) * 3) + col" 
        @card-in-play="updateBoard"
        :captured="grid[((row-1) * 3) + col].captured"
      ></triad-grid-cell>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { ICardInPlay, GridCellNumber, TriadBoardGrid } from '@/types/common'
  import { updateTriadBoard } from '@/modules/gameplay/board'
  import draggable from 'vuedraggable'
  import '@/types/common'
  import { updateHook } from '@/modules/dev-hooks'

  const emptyCellTemplate = {
    player: null,
    card: null,
    captured: false,
    elementalOffset: 0
  }

  const createCell = (cell: GridCellNumber) => {
    return {cell, ...JSON.parse(JSON.stringify(emptyCellTemplate))}
  }

  @Component({
    components: {
      draggable,
      TriadGridCell: ()=> import('./TriadGridCell.vue')
    }
  })
  export default class TriadBoard extends Vue {
    grid: Record<number,ICardInPlay> = [1,2,3,4,5,6,7,8,9]
      .reduce((o: TriadBoardGrid, i: GridCellNumber) => ({ ...o, [i]: createCell(i) }), {})

    
    updateBoard(e: any){
      console.log('card-in-play', e.card.name, e)
      this.grid[e.cell].card = e.card 
      this.grid[e.cell].player = e.player
      this.grid[e.cell].directOwner = e.player.order
      this.grid[e.cell].captured = false
      console.log('updated grid with laid card, now updating board')
      this.grid = updateTriadBoard(this.grid, this.grid[e.cell])
      this.$emit('updated-board', this.grid)
    }

    mounted(){
      updateHook({ board: this })
      console.log('BOARD IS: ', this.grid)
    }


  }

</script>

<style lang="scss">
  

</style>