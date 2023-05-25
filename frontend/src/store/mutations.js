export default {
  hideLoadingScreen(state){
    state.isLoading = false;
  },
  setGameState(state, gameState){
    Object.keys(gameState).forEach(k => {
      if (k in state) {
        state[k] = gameState[k];
      }
    });

    console.log(gameState);
  },
  setDealerHand(state, hand) {
    state.dealerHand = hand;
  },
  setPlayerHand(state, hand) {
    state.playerHand = hand;
  },
  addCardToDealerHand(state, card) {
    state.dealerHand.push(card);
  },
  addCardToPlayerHand(state, card) {
    state.playerHand.push(card);
  },
}