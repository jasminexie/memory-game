import Vue from "vue";
import Vuex from "vuex";
import { MAX_LEVEL } from "../components/config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lives: 3,
    level: 1,
    gameState: 0, // 0: 未开始；1: 进行中；2: 已结束
  },
  mutations: {
    addLevel(state) {
      if (state.level < MAX_LEVEL) {
        state.level += 1;
      } else {
        state.gameState = 2;
      }
    },
    subtractLives(state) {
      if (state.lives > 0) {
        state.lives -= 1;
      }
      if (state.lives <= 0) {
        state.gameState = 2;
      }
    },
    startGame(state) {
      state.lives = 3;
      state.level = 1;
      state.gameState = 1;
    },
  },
  actions: {},
});
