<template>
  <div class="doc-example">
    <p>
      <label for="tabInput">
        Try tabbing these names: {{ entryPlaceholder }}
      </label>
    </p>

    <tab-complete-input
      id="tabInput"
      v-model="text"
      :data-source="names"
      @tabFailed="onTabFailed"
      @tabSuccess="onTabSuccess"
    />

    <div>
      {{ completions }}
    </div>

    <Button v-on:click="resetNames">{{ buttonText }}</Button>
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
      buttonText: "Change Names",
      completions: ""
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
    onTabFailed() {
      this.completions = "No completions";
    },
    onTabSuccess(e) {
      if (!e.completions) return;
      this.completions = "Found the following: " + e.completions.join(", ");
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
</style>
