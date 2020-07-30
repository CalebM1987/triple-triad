<template>
  <div class="card-slot">
    <draggable v-model="cards" v-if="cards.length < maxCount && false" class="draggable-card">
      <div class="draggable-card" v-for="(card, index) in cards" :key="index">
        <p>{{ index}} index</p>
        <div style="min-height: 1.5rem;">{{ card.label}} {{ index }}</div>
        <!-- <template slot="card" slot-scope="{ card, index }">
          <div style="min-height: 1.5rem;">{{ card.label}} {{ index }}</div>
        </template> -->
      </div>
    </draggable>

  <div v-else>
    <div class="stationary-card">
      <template slot="card" slot-scope="card">
          {{ card.label}}
        </template>
    </div>
  </div>

  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import draggable from 'vuedraggable'

  @Component({
    components: {
      draggable,
      TriadCard: ()=> import('./TriadCard.vue')
    }
  })
  export default class CardSlot extends Vue {
    // @Prop() card: ICard | undefined
    @Prop() cards: ICard[] = []
    @Prop({ default: 1 }) maxCount: number

    // cards: ICard[] = []


  }

</script>

<style lang="scss">

</style>