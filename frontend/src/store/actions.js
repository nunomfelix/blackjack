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
}