<template>
  <main class="table">
    <section class="dealer-side">
      <GameHand v-if="dealerHand.length" :hand="dealerHand" :score="dealerScore"/>
    </section>
    <section class="player-side">
      <GameHand v-if="playerHand.length" :hand="playerHand" :score="playerScore"/>
    </section>

    <transition name="fade">
      <div v-if="statusList.includes(status)" class="result-overlay">
        <p>{{ status }}</p>
      </div>
    </transition>

    <Controls/>
  </main>
</template>

<script>
import GameHand from '@/components/Game/GameHand.vue';
import Controls from '@/components/Game/Controls.vue';

import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      statusList: ['Player wins', 'Dealer wins', 'Tie']
    };
  },  
  components: {
    GameHand,
    Controls,
  },
  computed: {
    ...mapState([
      'dealerHand',
      'playerHand',
      'status'
    ]),
    playerScore (){
      return this.$store.state.score.player;
    },
    dealerScore (){
      return this.$store.state.score.dealer;
    }
  },
  watch: {
    status(newStatus) {
      if (this.statusList.includes(newStatus)) {
        console.log('entrei aqui')
        setTimeout(() => {
          this.$store.dispatch('startNewGame');
        }, 5000); // Delay before starting new game
      }
    }
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.result-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.350);
  color: #fff;
  font-size: 2em;
  z-index: 100;
}
</style>