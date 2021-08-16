<template>
  <div class="board">
    <template v-if="data != null">
      <div class="new-todo" @click="visible = true">
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
        new todo
      </div>
      <div
        class="item"
        v-for="(n, i) in data.todos"
        :key="i"
        @contextmenu="removeTodo(n.id)"
      >
        <input :id="i" type="checkbox" v-model="n.done" />
        <label :for="i" :class="{ done: n.done }">{{ n.text }}</label>
      </div>
      <div v-if="visible" class="new-todo-input">
        <input
          v-focus="visible"
          @keyup="newTodo"
          type="text"
          v-model="newTodoModel"
          @blur="focusOut"
          spellcheck="false"
        />
      </div>
    </template>
    <div class="container" v-else>
      <h1>Contacts</h1>
      <div class="socials">
        <img
          @click="openExternal('https://github.com/kmrdev187')"
          src="https://s2.svgbox.net/social.svg?ic=github"
        />
        <img
          @click="openExternal('https://twitter.com/koos_mark')"
          src="https://s2.svgbox.net/social.svg?ic=twitter&color=1A91DA"
        />
        <img
          @click="openExternal('https://codepen.io/kmrdev187')"
          src="https://s2.svgbox.net/social.svg?ic=codepen"
        />
      </div>
      <h1>How to</h1>
      <div class="howto">
        <div class="howto__item">
          <img :src="mouseRight" />
          <span>delete item</span>
        </div>
        <div class="howto__item">
          <img :src="mouseLeft" />
          <span>mark as done</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { focus } from "vue-focus";
import { shell } from "electron";

export default {
  name: "board",
  directives: { focus: focus },
  data() {
    return {
      newTodoModel: "",
      visible: false,
      mouseRight: require("@/assets/mouse_right.png"),
      mouseLeft: require("@/assets/mouse_left.png"),
    };
  },
  props: ["data"],
  computed: {
    getList: function () {
      return this.$store.getters.getLists;
    },
    getListData: function () {
      return this.$store.getters.getListData;
    },
    getID: function () {
      const todos = this.getListData.todos;
      var id = 0;
      //get id of item's last index
      if (todos.length != 0) {
        id = todos[todos.length - 1].id + 1;
      }
      return id;
    },
  },
  methods: {
    newTodo: function (event) {
      if (event.key == "Enter") {
        this.$store.commit("addListItem", {
          id: this.data.id,
          data: { id: this.getID, text: this.newTodoModel, done: false },
        });
        this.visible = false;
        this.newTodoModel = "";
      }
    },
    removeTodo: function (id) {
      this.$store.commit("removeListItem", {
        listID: this.data.id,
        listItemID: id,
      });
    },
    focusOut: function () {
      this.visible = false;
      this.newTodoModel = "";
    },
    openExternal: function (url) {
      shell.openExternal(url);
    },
  },
};
</script>

<style lang="scss" scoped>
.board {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .container {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
      color: #586e79;
      margin: 0.2em 0;
      user-select: none;
      a {
        text-decoration: none;
        color: rgb(179, 179, 179);
      }
    }

    .socials {
      img {
        width: 2.8rem;
        margin: 2rem 1.5rem;
        user-select: none;
        -webkit-user-drag: none;
        cursor: pointer;
      }
    }

    .howto {
      .howto__item {
        display: flex;
        align-items: center;
        margin: 2rem 0;

        img {
          width: 2rem;
          height: auto;
          margin-right: 1rem;
        }

        span {
          font-size: 1.2rem;
        }
      }
    }
  }

  .new-todo {
    margin: 0.5em;
    padding: 0.5em 1em;
    width: max-content;
    color: #586e79;
    border-radius: 0.5em;
    cursor: pointer;
    display: flex;
    align-items: center;

    svg {
      width: 24px;
      height: 24px;
      path {
        fill: #586e79;
      }
    }

    &:hover {
      background-color: #3c474c;
    }
  }

  .new-todo-input {
    margin: 0 1em 0 2.3em;
    display: flex;
    input[type="text"] {
      appearance: none;
      border: 0;
      outline: none;
      height: 28px;
      font: inherit !important;
      flex: 1;
      background-color: #3c474c;
      color: #586e79;
    }
  }

  .done {
    text-decoration: line-through;
  }

  .item {
    margin: 0.2em 1em 0.2em 0.5em;
    display: flex;
    color: #586e79;

    input[type="checkbox"] {
      position: relative;
      appearance: none;
      outline: none;
      width: 14px;
      height: 14px;
      border-radius: 3px;
      background-color: #3c474c;

      &:checked:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 3px;
        background-color: #72b46f;
      }
    }

    label {
      overflow: hidden;
      word-break: break-all;
      margin-left: 0.5em;
    }
  }
}
</style>
