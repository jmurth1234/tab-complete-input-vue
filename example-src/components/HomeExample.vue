<template>
  <div class="doc-example">
    <p>
      <label for="tabInput">
        Try tabbing these names: {{ entryPlaceholder }}
      </label>
    </p>

    <tab-complete-input id="tabInput" v-model="text" :data-source="names" />

    <button v-on:click="resetNames">{{ buttonText }}</button>
  </div>
</template>

<script>
import TabCompleteInput from "../../src/tab-complete-input";
import { staticList } from "./shared";

export default {
  components: { TabCompleteInput },
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
  @apply mb-2 text-base pb-2;
}

.tab {
  display: flex;
  flex-direction: row;
}

input {
  @apply border-solid mb-2 border-gray-500 border rounded p-2 shadow-inner w-full;
}

input:focus {
  @apply shadow-outline;
}

button {
  @apply bg-indigo-600 px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white transition duration-150 ease-in-out my-2;
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
