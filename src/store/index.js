import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists: [],
    selectedList: 0,
    isLight: false,
  },
  getters: {
    getLists: (state) => {
      return state.lists;
    },
    getListData: (state) => {
      if (state.lists) return state.lists[state.selectedList];
    },
    getSelectedItem: (state) => {
      return state.selectedList;
    },
    getTheme: (state) => {
      return state.isLight;
    },
  },
  mutations: {
    initLists(state) {
      if (
        localStorage.getItem("lists") !== null &&
        localStorage.getItem("lists") !== ""
      ) {
        state.lists = JSON.parse(localStorage.getItem("lists"));
      }

      if (
        localStorage.getItem("selected") !== null &&
        localStorage.getItem("selected") !== "" &&
        Number.parseInt(localStorage.getItem("selected")) >= 0
      ) {
        state.selectedList = Number.parseInt(localStorage.getItem("selected"));
      }
    },
    saveLists(state) {
      localStorage.setItem("lists", JSON.stringify(state.lists));
      localStorage.setItem("selected", state.selectedList.toString());
    },
    initTheme(state) {
      if (
        localStorage.getItem("theme") !== null &&
        localStorage.getItem("theme") != ""
      ) {
        if (localStorage.getItem("theme") == "true") state.isLight = true;
        else if (localStorage.getItem("theme" == "false")) {
          state.isLight = false;
        }
      }
    },
    addItem(state, item) {
      state.lists.push(item);
    },
    removeItem(state, id) {
      //decreases the index of the selected list because the length of the array is reduced by one
      if (state.selectedList - 1 >= 0) state.selectedList -= 1;
      else state.selectedList = 0;
      //get item index by item id
      const removeIndex = state.lists
        .map((item) => {
          return item.id;
        })
        .indexOf(id);
      //remove item from lists array by index
      state.lists.splice(removeIndex, 1);
    },
    selectItem(state, index) {
      //get item index by item id
      const indexByID = state.lists
        .map((item) => {
          return item.id;
        })
        .indexOf(index);
      //the selected list index is equal to the item index
      state.selectedList = indexByID;
    },
    addListItem(state, item) {
      state.lists.forEach((ele) => {
        if (ele.id == item.id) {
          ele.todos.push(item.data);
        }
      });
    },
    removeListItem(state, item) {
      const listID = item.listID;
      const listItemID = item.listItemID;
      state.lists.forEach((ele) => {
        if (ele.id == listID) {
          const indexByID = ele.todos
            .map((item) => {
              return item.id;
            })
            .indexOf(listItemID);
          ele.todos.splice(indexByID, 1);
        }
      });
    },
    setTheme(state, theme) {
      state.isLight = theme;
      localStorage.setItem("theme", state.isLight.toString());
    },
  },
  actions: {},
  modules: {},
});
