<template>
  <div class="appbar">
    <img class="app-icon" :src="appIcon" alt="app_icon">
    <span class="app-title">todoapp</span>
    <input type="checkbox" v-model="isLight" id="theme-selector" />
    <div class="win-btns">
      <div class="win-btn" @click="closeWin">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 50 50"
        >
          <path
            fill="#231F20"
            d="M9.016,40.837c0.195,0.195,0.451,0.292,0.707,0.292c0.256,0,0.512-0.098,0.708-0.293l14.292-14.309
          l14.292,14.309c0.195,0.196,0.451,0.293,0.708,0.293c0.256,0,0.512-0.098,0.707-0.292c0.391-0.39,0.391-1.023,0.001-1.414
          L26.153,25.129L40.43,10.836c0.39-0.391,0.39-1.024-0.001-1.414c-0.392-0.391-1.024-0.391-1.414,0.001L24.722,23.732L10.43,9.423
          c-0.391-0.391-1.024-0.391-1.414-0.001c-0.391,0.39-0.391,1.023-0.001,1.414l14.276,14.293L9.015,39.423
          C8.625,39.813,8.625,40.447,9.016,40.837z"
          />
        </svg>
      </div>
      <div class="win-btn" @click="maxWin">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 50 50"
        >
          <path
            fill="#231F20"
            d="M9.27,41.224h30c0.553,0,1-0.447,1-1v-30c0-0.552-0.447-1-1-1h-30c-0.553,0-1,0.448-1,1v30
          C8.27,40.776,8.717,41.224,9.27,41.224z M10.27,11.224h28v28h-28V11.224z"
          />
        </svg>
      </div>
      <div class="win-btn" @click="minWin">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 50 50"
        >
          <path
            d="M40,23.99H10c-0.552,0-1,0.447-1,1s0.448,1,1,1h30c0.552,0,1-0.447,1-1S40.552,23.99,40,23.99z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
  name: "appbar",
  data(){
    return{
      appIcon: require('@/assets/icon.png')
    }
  },
  methods: {
    minWin: () => {
      ipcRenderer.send("minimize-win");
    },
    maxWin: () => {
      ipcRenderer.send("maximize-win");
    },
    closeWin: () => {
      ipcRenderer.send("close-win");
    },
  },
  computed: {
    isLight: {
      get() {
        return this.$store.getters.getTheme;
      },
      set(val) {
        this.$store.commit("setTheme", val);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.appbar {
  max-height: 30px;
  width: 100%;
  -webkit-app-region: drag;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border);

  & > * {
    -webkit-app-region: no-drag;
  }

  .app-icon{
    width: 1.5rem;
    height: auto;
    margin: 0 .5rem;
  }

  .app-title {
    font-size: 1.2em;
    pointer-events: none;
    color: var(--appbar-title);
  }

  .win-btns {
    margin-left: auto;
    display: flex;
    flex-direction: row-reverse;

    .win-btn {
      padding: 0 0.5em;
      cursor: pointer;
      height: 29px;
      display: flex;
      align-items: center;

      &:first-child:hover {
        background-color: var(--close);
      }

      &:hover {
        background-color: var(--hover);
      }

      svg {
        width: 20px;
        height: 20px;

        path {
          fill: var(--appbar-button);
        }
      }
    }
  }

  #theme-selector {
    margin-left: 1em;
    appearance: none;
    outline: none;
    position: relative;
    height: 10px;
    width: 32px;
    border-radius: 8px;
    background-color: var(--hover);
    cursor: pointer;

    &:after {
      content: "\1F311";
      position: absolute;
      top: -3px;
      left: -3px;
      width: 16px;
      height: 16px;
      font-size: 16px;
      line-height: 16px;
      letter-spacing: -6px;
      border-radius: 50%;
      transition: all 0.2s ease;
    }

    &:checked:after {
      content: "☀️";
      left: 13px;
    }
  }
}
</style>
