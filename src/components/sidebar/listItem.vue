<template>
  <div
    class="list-item"
    :class="{ selected: getSelectedItem == listID }"
    @click="selectItem"
  >
    <span>{{ listTitle }}</span>
    <svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      @click.stop="removeSelf"
    >
      <g
        fill="none"
        fill-rule="evenodd"
        id="Page-1"
        stroke="none"
        stroke-width="1"
      >
        <g id="Artboard-Copy" transform="translate(-407.000000, -369.000000)">
          <path
            d="M420,383 L420,405 C420,406.105 420.896,406.998 422,406.998 L440,406.998 C441.104,406.998 442,406.105 442,405 L442,383 L420,383 Z M426,402 L428,402 L428,388 L426,388 L426,402 Z M430,402 L432,402 L432,388 L430,388 L430,402 Z M434,402 L436,402 L436,388 L434,388 L434,402 Z M419,378 C418.449,378 418,378.447 418,379 L418,382 L444,382 L444,379 C444,378.447 443.551,378 443,378 L432.998,378 L432.998,376 L429.002,376 L429.002,378 L419,378 Z"
            id="trash"
          />
          <g id="slices" transform="translate(47.000000, 9.000000)" />
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "listItem",
  props: {
    listTitle: {
      type: String,
    },
    listID: {
      type: Number,
    },
  },
  methods: {
    removeSelf: function () {
      this.$store.commit("removeItem", this.listID);
    },
    selectItem: function () {
      this.$store.commit("selectItem", this.listID);
    },
  },
  computed: {
    getSelectedItem: function () {
      return this.$store.getters.getListData.id;
    },
  },
};
</script>

<style lang="scss" scoped>
.selected {
  background-color: #3c474c;
}

.list-item {
  margin: 0.5em 0;
  padding: 0.2em 1em;
  color: #586e79;
  display: flex;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  position: relative;

  svg {
    min-width: 24px;
    height: 24px;
    margin-left: auto;

    &:hover {
      path {
        fill: #cf4638;
      }
    }

    path {
      fill: #586e79;
    }
  }

  &:hover {
    background-color: #3c474c;
  }

  span {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    pointer-events: none;
  }
}
</style>
