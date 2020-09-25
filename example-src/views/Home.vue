<template>
  <div>
    <TabInput
      id="tabInput"
      v-model="msg"
      :data-source="staticList"
      :format="getFormat"
    />
    <p>{{ msg }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TabInput, { FormatFunction } from "../../src/tab-complete-input";

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
    TabInput
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js + TypeScript Demo of Vue Tab Complete Input",
      staticList
    };
  },
  methods: {
    getFormat
  }
});
</script>

<style scoped>
div {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}

input {
  width: auto;
  padding: 10px;
  text-align: center;
}
</style>
