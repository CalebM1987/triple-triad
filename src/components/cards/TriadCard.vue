<template>
  <div 
    ref="card"
    :class="['triad-card', 'card-base', 'noselect', `playerOrder-${playerOrder}`, captured ? 'captured': '']" 
    :title="card.label"
  >
    <div class="triad-card-body">

      <div class="value-sides">
        <div class="top value">{{ card.top | valueLabel }}</div>
        <span class="d-flex sides">
          <span class="left value mr-4">{{ card.left | valueLabel }}</span>
          <span class="right value">{{ card.right | valueLabel }}</span>
        </span>
        <div class="bottom value">{{ card.bottom | valueLabel }}</div>
      </div>

      <b-img 
        :src="card.image" 
        class="card-image my-auto mx-auto"
      ></b-img>

      <div class="label-container text-nowrap">
        <p class="card-label text-center">{{ card.label }}</p>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import { OneOrTwo } from '../../modules/rng/random'

  @Component({
    filters: {
      valueLabel(n: number): string | number {
        return n < 10 ? n: n === 10 ? 'A': 'B'
      }
    }
  })
  export default class TriadCard extends Vue {
    @Prop() card: ICard | undefined
    @Prop({ default: 1 }) playerOrder: OneOrTwo
    @Prop({ default: false }) captured: boolean

    get totalValue(){
      return this.card ? this.card.top + this.card.bottom + this.card.left + this.card.right: 0
    }

    // @Watch('captured')
    // onCapturedChange(captured: boolean){
    //   const elm = this.$refs.card as Element
    //   // TODO: add flip animation
    // }

  }

</script>

<style lang="scss">

  $player1Color: #A05569;
  $player1Gradient: linear-gradient(#F5B4D4, #DC97B4, #C17991, #A05569, #8A3346);
  $player2Color: #495C96;
  $player2Gradient: linear-gradient(#B5D3F5,#91ACD7, #7087B9, #495C96, #344687);

  @mixin cardBackground($color, $gradient){
    background-color: $color;
    background-image: $gradient;
  }
 

  .triad-card {
    position: absolute;
    background-color: #63B8FF;
    background-image: linear-gradient(rgb(240, 246, 248),#51affc);
    // width: 234px;
    // height: 325px;
    border: solid 6px gainsboro;
    border-bottom: solid 1.5rem gainsboro;
    border-radius: 10px;
  }

  .triad-card-body {
    border-radius: 10px;
    margin-top: 3px;
    // margin-top: 10px;
  }

  .playerOrder-1{
    @include cardBackground($player1Color, $player1Gradient);
    &.captured {
      @include cardBackground($player2Color, $player2Gradient);
    }
  }

  .playerOrder-2{
    @include cardBackground($player2Color, $player2Gradient);
    &.captured {
      @include cardBackground($player1Color, $player1Gradient);
    }
  }

  .value-sides {
    position: absolute;
    top: 0.25rem;
    left: 0.5rem;
    z-index: 10;
  }

  .label-container {
    position:absolute;
    bottom:-38px;
    left:50%;
    width: auto;
    transform: translateX(-50%);
  }

  .card-label {
    font-family: Georgia, 'Times New Roman', Times, serif;
    z-index: 10;
  }

  // .card-image {
  //   pointer-events: none;
  //   height: 75%;
  //   width: auto;
  // }

  .value {
    font-family: "Times New Roman", Times, serif;
    font-weight: 600;
    font-size: 1.4rem;
    color: white;
    text-shadow: -1px 0 black, 0 1px black,
      1px 0 black, 0 -1px black
  }

  .noselect {
    /* https://stackoverflow.com/a/4407335/3005089 */
    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome, Edge, Opera and Firefox */
  }

  .top {
    top: 0.5rem;
    left: 1rem;
  }

  .sides {
    top: 1.2rem;
  }

  .left {
    left: 0.5rem;
  }

  .right {
    left: 1.5rem;
  }

  .bottom {
    top: 2rem;
    left: 0.5rem;
  }

</style>