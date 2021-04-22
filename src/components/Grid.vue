<template>
  <div class="container">
    <div
      v-for="l in currentConf.squares"
      :key="l"
      :class="{ 'square-container': true }"
    >
      <div
        v-for="s in currentConf.squares"
        :key="getKey(l, s)"
        :class="{
          square: true,
          active: clicked.includes(getKey(l, s)),
          error:
            clicked.includes(getKey(l, s)) && !random.includes(getKey(l, s)),
        }"
        @click="clickSquare(l, s)"
      ></div>
    </div>
  </div>
</template>

<script>
import { config, MAX_TRIES } from "./config";
import { mapMutations, mapState } from "vuex";

const shuffle = (array) => {
  var i = array.length,
    j = 0,
    temp;

  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

const sleep = (time) => new Promise((r) => setTimeout(r, time));

export default {
  data() {
    return {
      config: Object.freeze(config),
      random: [],
      clicked: [],
      lock: false,
    };
  },
  computed: {
    ...mapState(["lives", "level", "gameState"]),
    currentConf() {
      return config.find((c) => c.level === this.level);
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapMutations(["startGame", "subtractLives", "addLevel"]),
    clear() {
      this.clicked = [];
      this.random = [];
    },
    async init() {
      this.lock = true;
      await sleep(1000);
      this.random = shuffle(
        Array(this.currentConf.squares ** 2)
          .fill()
          .map((_, i) => i + 1)
      ).slice(0, this.currentConf.active);
      this.clicked = this.random;

      await sleep(500);
      this.clicked = [];

      this.lock = false;
    },
    getKey(l, s) {
      return (l - 1) * this.currentConf.squares + s;
    },
    async clickSquare(l, s) {
      if (this.lock) {
        return;
      }
      this.lock = true;
      this.clicked.push(this.getKey(l, s));

      if (
        this.clicked.filter((x) => !this.random.includes(x)).length >= MAX_TRIES
      ) {
        // [clicked] has 3 elements that are not in [random] - lose a life
        this.next(this.subtractLives);
      } else if (
        // all [clicked] elements all present in random - proceed
        this.clicked.filter((x) => this.random.includes(x)).length ===
        this.random.length
      ) {
        this.next(this.addLevel);
      }

      this.lock = false;
    },
    async next(callback) {
      await sleep(500);
      this.clear();
      callback();
      if (this.gameState === 1) {
        await sleep(500);
        this.init();
      }
    },
  },
};
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  padding: 0 20px;
  .square-container {
    display: flex;
  }
  .square {
    cursor: pointer;
    flex: 1;
    display: inline-block;
    aspect-ratio: 1;
    background-color: rgba(50, 114, 210, 0.5);
    border-radius: 10px;
    border: 4px solid rgba(0, 0, 0, 0);
    backface-visibility: visible;
    transform: rotateX(0deg) translateZ(1px);
    transition: transform 0.3s ease-out 0s;
    z-index: 1;
    background-clip: padding-box !important;
    outline: none;

    &.active {
      background: white;
      transform: rotateX(180deg) translateZ(1px);
    }
    &.error {
      background: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
