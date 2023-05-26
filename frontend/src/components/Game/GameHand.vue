<template>
  <div
    class="game-hand"
    :class= "handClasses"
  >
    <transition-group name="deal" tag="div" class="cards">
        <div v-for="(card,i) in hand" :key="i">
          <img v-if="card.hidden" class="card-image hidden-card" src="/cards/card-back.png"/>
          <img v-else class="card-image" :src="this.getImageUrl(card.value, card.suit)"/>
        </div>
    </transition-group>
    <HandTotal v-if="showHandTotal" :score="score" />
  </div>
</template>

<script>
import HandTotal from '@/components/Game/HandTotal.vue';

export default {
  components: {
    HandTotal
  },
  props: {
    hand: { required: true },
    score: { required: true}
  },
  data() {
    return {
      suit: {
        'spades': 'S',
        'hearts': 'H',
        'clubs': 'C',
        'diamonds': 'D'
      },
    };
  },
  computed: {
    handClasses () {
      let classes = []
  
      if (this.$store.state.turn === 'player') {
        classes.push('is-active');
      } else {
        classes.push('is-inactive');
      }

      if (this.$store.state.turn === 'dealer') {
        classes.push('is-dealer');
      } 
    },
    getImageUrl() {
      return (value, suit) => {
        const cardValue = value === '10' ? '0' : value;
        return `/cards/${cardValue}${this.suit[suit]}.png`;
      };
    },
    showHandTotal() {
      return !this.hand.some(card => card.hidden);
    }
  },
}
</script>

<style scoped>
.game-hand {
  position: relative;
  transition: transform 0.2s ease;
}
.game-hand.is-dealer, .game-hand.is-split {
  transform: scale(0.9);
}
.game-hand.is-active, .game-hand.is-split.is-active {
  position: absolute;
  max-width: 55%;
  transform: scale(1.3);
  z-index: 100;
}
.game-hand.is-split {
  transition: scale 0s;
}
.game-hand.is-inactive {
  opacity: 0.3;
  transform: translateY(-4rem);
}
.cards {
  min-height: 12.4rem;
  min-width: 8.4rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
}
.card-image {
  width: 150px; /* Set desired width for the images */
  height: auto; /* Preserve aspect ratio */
}

.hidden-card {
  width: 148px; /* Set desired width for the hidden card image */
  border-radius: 5%;
  height: auto; /* Preserve aspect ratio */
}

.deal-enter-active {
  animation: deal 0.3s;
}
.deal-leave-active {
  animation: deal 0.3s reverse;
}
.is-split .deal-leave-active {
  animation-duration: 0;
}
@keyframes deal {
  0% {
    transform: translateY(-100vh);
  }
  100% {
    transform: translateY(0);
  }
}
</style>