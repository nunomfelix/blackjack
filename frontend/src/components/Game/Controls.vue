<template>
  <div class="controls-row">
    <div class="controls">
      <!-- <GameButton
        action="doubleDown"
        :is-enabled="canDoubleDown && isPlayerTurn"
      />
      <GameButton
        action="split"
        :is-enabled="canSplit && isPlayerTurn"
      />
      <TheBank />
      <GameButton
        action="stand"
        :is-enabled="isPlayerTurn"
      />
      <GameButton
        action="hit"
        :is-enabled="isPlayerTurn"
      /> -->
      <GameButton
        action="doubleDown"
      />
      <GameButton
        action="split"
      />
      <!-- <Bank /> -->
      <GameButton
        action="stand"
      />
      <GameButton
        action="hit"
      />
    </div>
  </div>
</template>

<script>
import GameButton from '@/components/Game/GameButton.vue';

import { mapGetters, mapState } from 'vuex';

export default {
  components: {
    GameButton
  },
  computed: {
    // isPlayerTurn () {
    //   return !this.isDealing && this.activeHandIndex > 0
    // },
    // ...mapState([
    //   'isDealing',
    //   'activeHandIndex'
    // ]),
    // ...mapGetters([
    //   'canSplit',
    //   'canDoubleDown'
    // ])
  }
}
</script>

<style scoped>
.controls-row {
  text-align: center;
}
.controls {
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.controls > * {
  margin-right: 0.5rem;
}

</style>
