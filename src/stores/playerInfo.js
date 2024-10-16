import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const usePlayerInfoStore = defineStore({
  id: "playerInfo",
  state: () => ({
    name: useStorage("name", ""),
    email: useStorage("email", ""),
    phone: useStorage("phone", ""),
    personvernerChecked: useStorage("personvernerChecked", ""),
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
    setPersonvernerChecked(input) {
      this.personvernerChecked = input;
    },
  },
});
