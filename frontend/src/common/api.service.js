import axios from 'axios';
import { API_URL } from "@/common/config";

export const axiosClient = axios.create({
  baseURL: API_URL
});

const ApiService = {
  // setHeader() {
  //   axiosClient.defaults.headers[
  //     "Authorization"
  //   ] = `Token ${JwtService.getToken()}`;
  // },

  query(resource, params) {
    return axiosClient.get(resource, params).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  get(resource, slug = "") {
    return axiosClient.get(`${resource}/${slug}`).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  post(resource, params) {
    return axiosClient.post(`${resource}`, params);
  },

  update(resource, slug, params) {
    return axiosClient.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return axiosClient.put(`${resource}`, params);
  },

  delete(resource) {
    return axiosClient.delete(resource).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
};

export default ApiService;

export const GameService = {
  startNewGame(params) {
    return ApiService.post('game/start', params);
  },

  playerHit(params) {
    return ApiService.post('game/playerHit', params);
  },

  playerStand(params) {
    return ApiService.post('game/playerStand', params);
  },

  playerSplit(params) {
    return ApiService.post('game/playerSplit', params);
  },

  playerDoubleDown(params) {
    return ApiService.post('game/playerDoubleDown', params);
  }

}