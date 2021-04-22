<template>
  <!-- 还没开始 -->
  <div id="app" v-if="gameState === 0">
    <button class="start-button" @click="startGame">Start</button>
  </div>
  <!-- 进行中 -->
  <div id="app" v-else-if="gameState === 1">
    <h1>Level {{ level }}; Lives {{ lives }}</h1>
    <Grid />
  </div>
  <!-- 结束-->
  <div id="app" v-else>
    <h1>Game over! Level {{ level }}; Lives {{ lives }}</h1>
  </div>
</template>

<script>
import Grid from "./components/Grid.vue";
import { mapMutations, mapState } from "vuex";
const MAX_LEVEL = 20;

export default {
  name: "App",
  components: {
    Grid,
  },
  data() {
    return {
      MAX_LEVEL,
    };
  },
  computed: {
    ...mapState(["lives", "level", "gameState"]),
  },
  methods: {
    ...mapMutations(["startGame"]),
  },
};
</script>

<style lang="less">
body {
  background: rgb(43, 135, 209);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.start-button {
  padding: 12px 30px;
  background: rgb(255, 209, 84);
  display: inline-block;
  border: none;
  border-radius: 3px;
  transition: background 0.1s linear 0s;
  font-weight: bold;
  cursor: pointer;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
  color: rgb(51, 51, 51) !important;
  text-decoration: none !important;
}
</style>
