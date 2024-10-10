<template>
  <div v-if="nameStore.name === ''" class="background">
    <div class="name-wrapper">
      <h3>What's your name?</h3>
      <form v-on:submit.prevent="setName" class="name">
        <input v-model="name" type="text" placeholder="Name" />
        <input type="submit" value="Save" />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useNameStore } from "@/stores/name";

const name = ref("");
const nameStore = useNameStore();

function setName() {
  nameStore.setName(name.value);
}
</script>

<style lang="scss" scoped>
.background {
  align-items: center;
  background-color: rgba(42, 42, 42, 0.9);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed; /* Stay in place */
  top: 0;
  width: 100vw;
  z-index: 1; /* Sit on top */
}

.name-wrapper {
  background-color: $bv-citrine-white;
  color: $bv-text-color-dark;
  padding: 80px 75px 40px 75px;
}

h3 {
  color: #11133c;
  font-style: normal;
  font-size: 36px;
  font-weight: 700;
  line-height: 48px;
  margin-bottom: 15px;
}

.name {
  display: flex;
  flex-direction: column;

  input[type="text"] {
    background: #ffffff;
    border: 1px solid $bv-blue;
    margin-bottom: 40px;
    padding: 10px;
    width: 600px;

    &::placeholder {
      color: #aaaaaa;
    }

    &:focus {
      border: 2px solid $bv-blue;
      padding: 8px;
    }
  }

  input[type="submit"] {
    align-self: end;
    background-color: $bv-orange;
    border: 2px solid $bv-orange;
    cursor: pointer;
    font-size: 20px;
    font-weight: 700;
    height: 50px;
    line-height: 26px;
    text-align: center;
    width: 100px;

    &:focus,
    &:hover {
      background-color: $bv-dark-orange;
      border: 2px solid $bv-dark-orange;
    }

    &:active {
      background-color: $bv-text-color-dark;
      color: $bv-orange;
      border: 2px solid $bv-orange;
    }
  }
}
</style>
