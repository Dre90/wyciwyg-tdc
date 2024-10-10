import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useNameStore = defineStore({
  id: "name",
  state: () => ({
    name: useStorage("name", ""),
  }),
  actions: {
    setName(input) {
      this.name = input;
    },
  },
});
