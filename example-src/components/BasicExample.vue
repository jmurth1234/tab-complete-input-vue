<template>
  <div class="doc-example">
    <p>
      <label for="tabInput">
        Try tabbing these names: {{ entryPlaceholder }}
      </label>
    </p>
    <div :class="showTab ? 'tab' : ''">
      <tab-complete-input
        ref="externalInput"
        id="tabInput"
        v-model="text"
        :data-source="names"
        v-on:keydown="enterText"
        v-on:keyup="logCurrent"
      />
      <button @click="tab" v-if="showTab">Tab</button>
    </div>
    <p v-if="showText || testEvents">
      Bound value: {{ testEvents ? enteredText : text }}
    </p>
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
      this.$refs.externalInput.tabComplete();
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
.doc-example {
  @apply border-solid border-gray-700 border rounded p-2 shadow-md bg-gray-200;
}

p {
  @apply my-2 text-base p-2;
}

.tab {
  display: flex;
  flex-direction: row;
}

div {
  margin: 10px;
}

input {
  flex: 0 1 auto;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  @apply border-solid border-gray-500 border rounded p-2 shadow-inner w-full;
}

input:focus {
  @apply shadow-outline;
}

button {
  @apply bg-indigo-600 px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white transition duration-150 ease-in-out mx-2;
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
