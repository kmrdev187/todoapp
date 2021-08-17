<template>
  <div class="sidebar">
    <div class="new-list" @click="visible = true">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 50 50"
      >
        <path
          d="M9.077,25.99h14v14c0,0.553,0.448,1,1,1s1-0.447,1-1v-14h14c0.552,0,1-0.447,1-1s-0.448-1-1-1h-14v-14c0-0.553-0.448-1-1-1
        s-1,0.447-1,1v14h-14c-0.552,0-1,0.447-1,1S8.525,25.99,9.077,25.99z"
        />
      </svg>
      new list
    </div>
    <list-item
      v-for="n in lists"
      :key="n.id"
      :listID="n.id"
      :listTitle="n.title"
    ></list-item>
    <div v-if="visible" class="new-list-input">
      <input
        v-focus="visible"
        @keyup="newList"
        type="text"
        v-model="newTitle"
        @blur="focusOut"
        spellcheck="false"
      />
    </div>
  </div>
</template>

<script>
import { focus } from "vue-focus";
import listItem from "./sidebar/listItem";

export default {
  name: "sidebar",
  directives: { focus: focus },
  components: {
    listItem,
  },
  data() {
    return {
      newTitle: "",
      visible: false,
    };
  },
  methods: {
    newList: function (event) {
      if (event.key == "Enter") {
        this.$store.commit("addItem", {
          id: this.listsCount,
          title: this.newTitle,
          todos: [],
        });
        this.visible = false;
        this.newTitle = "";
      }
    },
    focusOut: function () {
      this.visible = false;
      this.newTitle = "";
    },
  },
  computed: {
    lists() {
      return this.$store.getters.getLists;
    },
    listsCount() {
      const list = this.$store.getters.getLists;
      if (list.length != 0) return list[list.length - 1].id + 1;
      else return 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  min-width: 200px;
  max-width: 200px;
  height: 100%;
  border-right: 1px solid var(--border);

  .new-list {
    margin: 0.5em auto;
    padding: 0.5em 1em;
    width: max-content;
    color: var(--secondary);
    border-radius: 0.5em;
    cursor: pointer;
    display: flex;
    align-items: center;

    svg {
      width: 24px;
      height: 24px;
      path {
        fill: var(--secondary);
      }
    }

    &:hover {
      background-color: var(--hover);
    }
  }

  .new-list-input {
    background-color: var(--hover);
    display: flex;
    input[type="text"] {
      appearance: none;
      border: 0;
      height: 28px;
      margin-left: 0.9em;
      outline: none;
      background-color: var(--hover);
      color: var(--secondary);
      font: inherit !important;
    }
  }
}
</style>
