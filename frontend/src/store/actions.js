import { GameService } from "@/common/api.service";

export default {
  async startNewGame ({ commit, dispatch }){
    try {

      const { data } = await GameService.startNewGame();
      //set game state
      commit('setGameState', data)
      commit('hideLoadingScreen');
    } catch (e) {
      console.log('ERROR', e);
      //commit('setGameState', {})
    }
  },

  async hit ({ commit, dispatch }){
    const { data } = await GameService.playerHit();
    console.log(data);
    commit('setGameState', data)
  },

  async stand ({ commit, dispatch }){
    const { data } = await GameService.playerStand();
    commit('setGameState', data)
  },

  async split ({ commit, dispatch }){
    const { data } = await GameService.playerSplit();
    console.log(data);
    commit('setGameState', data)
  },

  async doubleDown ({ commit, dispatch }){
    const { data } = await GameService.playerDoubleDown();
    commit('setGameState', data)
  }
}