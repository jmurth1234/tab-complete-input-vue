<template>
  <div class="doc-example">
    <p>
      <label for="tabInput">
        Try tabbing these names: {{ entryPlaceholder }}
      </label>
    </p>

    <tab-complete-input
      ref="input"
      v-model="text"
      :data-source="names"
      @tabFailed="onTabFailed"
      @tabSuccess="onTabSuccess"
    />

    <div>
      <a
        v-for="(completion, i) in completions"
        v-bind:key="i"
        @click="() => chooseCompletion(i)"
      >
        {{ completion }}
      </a>
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
      completions: []
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
      this.completions = [];
    },
    onTabSuccess(e) {
      if (!e.completions) return;
      this.completions = e.completions;
    },
    chooseCompletion(i) {
      this.$refs.input.selectCompletion(i);
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

a {
  @apply px-4 py-2 mr-2 bg-gray-400 inline-block;
}
</style>
