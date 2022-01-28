<template>
  <div class="home">
    <b-container fluid class="p-3">
      <b-row>
        <b-col>
          <card-game></card-game>
        </b-col>

      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator'
import { State, Mutation, Getter, Action } from 'vuex-class'
import { updateHook } from '@/modules/dev-hooks'


@Component({
    components: {
     CardGame: () => import('@/components/cards/CardGame.vue')
    }
  })
export default class Home extends Vue {
  
  mounted(){
    updateHook({ home: this })
  }
}
</script>
