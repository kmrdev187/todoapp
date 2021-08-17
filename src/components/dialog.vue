<template>
  <div v-if="value" class="dialog">
    <div class="dialog__form">
      <h1>{{ dialogText }}</h1>
      <div class="dialog__form__controls">
        <button @click="okClick()" class="dialog-button --ok">Ok</button>
        <button @click="cancelClick()" class="dialog-button --cancel">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    value: {
      type: Boolean,
    },
    dialogText: {
      type: String,
    },
  },
  methods: {
    okClick() {
      this.$emit("resultok");
      this.$emit("input", false);
    },
    cancelClick() {
      this.$emit("resultcancel");
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;

  .dialog__form {
    width: max-content;
    height: 8rem;
    padding: 1rem;
    background: white;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;

    h1 {
      margin-top: 0;
      font-size: 1.5rem;
      color: black;
    }

    .dialog__form__controls {
      margin-top: auto;
      display: flex;
      justify-content: space-between;

      .dialog-button {
        appearance: none;
        border: 2px solid;
        border-radius: 1rem;
        outline: none;
        width: max-content;
        max-width: max-content;
        padding: 0.4rem 1rem;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
      }

      .--ok {
        background: lighten($color: rgb(154, 235, 33), $amount: 30);
        border-color: rgb(154, 235, 33);
      }

      .--cancel {
        background: lighten($color: rgb(240, 30, 30), $amount: 30);
        border-color: rgb(240, 30, 30);
      }
    }
  }
}
</style>
