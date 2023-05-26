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
  },
}