<template>
  <div id="app" :class="getTheme ? 'light' : ''">
    <appbar></appbar>
    <main>
      <sidebar></sidebar>
      <board :data="getListData"></board>
    </main>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
import appbar from "@/components/appbar";
import sidebar from "@/components/sidebar";
import board from "@/components/board";

export default {
  name: "App",
  components: { appbar, sidebar, board },
  data() {
    return {};
  },
  methods: {
    saveState: function () {
      this.$store.commit("saveLists");
    },
  },
  computed: {
    getListData: function () {
      var list = this.$store.getters.getListData;
      if (list != null) return list;
      else return null;
    },
    getTheme: function () {
      return this.$store.getters.getTheme;
    },
  },
  mounted() {
    this.$store.commit("initLists");
    this.$store.commit("initTheme");
    //listen message from electron window-all-closed event
    ipcRenderer.on("quit", this.saveState);
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap");
@import "@/themes/light.scss";
*,
::after,
::before {
  box-sizing: border-box;
  transition: all 0.2s;
}
body,
html {
  padding: 0;
  margin: 0;
  height: 100vh;
  font-family: "Nunito", sans-serif;
}
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #263238;
}
main {
  display: flex;
  flex: 1;
}
</style>
