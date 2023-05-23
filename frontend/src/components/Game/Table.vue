<template>
  <main class="table">
    <section class="dealer-side">
      <GameHand v-if="dealerHand.length" :hand="dealerHand"/>
    </section>
    <section class="player-side">
      <GameHand v-if="playerHand.length" :hand="playerHand"/>
    </section>
    <Controls :class="{ 'no-pointer-events': showDrawer }" />
  </main>
</template>

<script>
import GameHand from '@/components/Game/GameHand.vue';
import Controls from '@/components/Game/Controls.vue';

import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    GameHand,
    Controls
  },
  computed: {
    ...mapState([
      'dealerHand',
      'playerHand'
    ])
  }
}
</script>

<style scoped>
.table {
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 50;
  background-color: rgb(40, 105, 15)
}
.dealer-side {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  flex:1;
  margin-bottom: 1rem;
}
.player-side {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  flex:1;
  margin-top: 1rem;
}
</style>