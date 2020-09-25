<template>
  <div>
    <h1>Vue Tab Complete Input</h1>

    <BasicExample />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BasicExample from "../components/BasicExample.vue";
import { FormatFunction } from "../../src/tab-complete-input";

const staticList = [
  "John",
  "Jake",
  "Joe",
  "Noah",
  "Emma",
  "Will",
  "William",
  "Andrew",
  "Brady",
  "Ethan",
  "Dan",
  "Daniel",
  "Danny"
];

const getFormat: FormatFunction = (word, prev, position) => {
  if (position === 0 || (position > 0 && prev.search(",") !== -1)) {
    word = word + ": ";
  } else if (position > 0 && prev.search(":") !== -1) {
    word = word + ": ";
    prev = prev.replace(":", ",");
  }
  return { word, prev };
};

export default defineComponent({
  name: "App",
  components: {
    BasicExample
  }
});
</script>

<style lang="postcss" scoped>
div {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 60px;
}

h1 {
  @apply mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900;
}

</style>
