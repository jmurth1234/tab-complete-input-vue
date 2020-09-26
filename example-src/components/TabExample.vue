<template>
  <div class="doc-example">
    <p>
      <label for="tabInput">
        Try tabbing these names: {{ entryPlaceholder }}
      </label>
    </p>
    <div class="tab">
      <tab-complete-input
        ref="input"
        v-model="text"
        :data-source="names"
        v-on:keydown="enterText"
        v-on:keyup="logCurrent"
      />
      <button @click="tab">Tab</button>
    </div>

    <button v-on:click="resetNames">{{ buttonText }}</button>
  </div>
</template>

<script>
import TabCompleteInput from "../../src/tab-complete-input";
import { staticList } from "./shared";

export default {
  components: { TabCompleteInput },
  props: ["showText", "showTab", "testEvents"],
  data() {
    return {
      names: staticList.sort(),
      text: "",
      enteredText: "",
      buttonText: "Change Names"
    };
  },
  methods: {
    resetNames() {
      this.buttonText = "Changing Names...";
      import("./fake-names").then(fakeNames => {
        this.names = fakeNames.generate(20).sort();
        this.buttonText = "Change Names";
      });
    },
    tab(e) {
      e.preventDefault();
      this.$refs.input.handleTabPressed();
    },
    enterText() {
      if (!this.testEvents) return;
      this.enteredText = this.text;
      this.text = "";
    },
    logCurrent() {
      if (!this.testEvents) return;
      console.log("Current Value:", this.text);
    }
  },
  computed: {
    entryPlaceholder() {
      return this.names.join(", ");
    }
  }
};
</script>

<style lang="postcss" scoped>
p {
  @apply my-2 text-base py-2;
}

.tab {
  display: flex;
  flex-direction: row;
}

input {
  @apply border-solid mb-2 border-gray-500 border rounded-l-md rounded-r-none p-2 shadow-inner w-full;
}

input:focus {
  @apply shadow-outline;
}

button {
  @apply bg-indigo-600 mb-2 p-2 text-sm leading-5 font-medium rounded-r-md rounded-l-none text-white transition duration-150 ease-in-out;
}

button:hover {
  @apply bg-indigo-500;
}

button:active {
  @apply bg-indigo-700;
}

button:focus {
  @apply border-indigo-700 outline-none shadow-outline-indigo;
}
</style>
