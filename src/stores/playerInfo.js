import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const usePlayerInfoStore = defineStore({
  id: "playerInfo",
  state: () => ({
    name: useStorage("name", ""),
    email: useStorage("email", ""),
    phone: useStorage("phone", ""),
  }),
  actions: {
    setName(input) {
      this.name = input;
    },
    setEmail(input) {
      this.email = input;
    },
    setPhone(input) {
      this.phone = input;
    },
  },
});
