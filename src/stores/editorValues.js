import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useEditorValuesStore = defineStore({
  id: "editorValues",
  state: () => ({
    editorValues: useStorage("editorValues", []),
    resetEditorValue: false,
  }),
  actions: {
    setEditorValues(id, value) {
      const object = {
        id: id,
        value: value,
      };
      let exists = false;

      if (this.editorValues.length) {
        this.editorValues.forEach((item) => {
          if (item.id === object.id) {
            exists = true;
            return;
          }
        });

        if (!exists) {
          this.editorValues.push(object);
        }
      } else {
        this.editorValues.push(object);
      }
    },
    updateEditorValues(id, value) {
      this.editorValues = this.editorValues.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            value: value,
          };
        } else {
          return item;
        }
      });
    },
    updateResetEditorValue(value) {
      this.resetEditorValue = value;
    },
  },
  getters: {
    getEditorValueById(state) {
      return (id) =>
        state.editorValues.find((editorValue) => editorValue.id === id);
    },
    getResetEditorValue(state) {
      return state.resetEditorValue;
    },
  },
});
