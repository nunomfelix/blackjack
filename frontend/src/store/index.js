import { createStore } from 'vuex';
import actions from './actions';
import mutations from './mutations';

const state = {
  isLoading: true,
  dealerHand: [],
  playerHand: [],
  turn: null,
  settings: {
    deckCount: 6,
    startingBank: 100,
    minimumBet: 25,
  }
}

export default createStore({
  state,
  actions,
  mutations
})