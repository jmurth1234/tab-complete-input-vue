<template>
  <div class="doc-example">
    <p>
      <label for="tabInput">
        Try tabbing these names: {{ entryPlaceholder }}. You can also start a
        word with @ to complete as you type.
      </label>
    </p>

    <p>
      <Button v-on:click="resetNames">{{ buttonText }}</Button>
    </p>

    <tab-complete-input
      ref="input"
      v-model="text"
      :data-source="names"
      @tabFailed="onTabFailed"
      @tabSuccess="onTabSuccess"
      @selectionChanged="onTabSuccess"
    />

    <div>
      <a
        v-for="(completion, i) in completions"
        v-bind:key="i"
        v-bind:class="{ active: current == i }"
        @click="() => chooseCompletion(i)"
      >
        {{ completion }}
      </a>
    </div>
  </div>
</template>

<script>
import TabCompleteInput from "../../src/tab-complete-input";
import Button from "./primitive/Button.vue";
import { staticList } from "./shared";

export default {
  components: { TabCompleteInput, Button },
  data() {
    return {
      names: staticList.sort(),
      text: "",
      enteredText: "",
      buttonText: "Change Names",
      completions: [],
      current: 0
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
      this.current = e.current;
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
  @apply px-4 py-2 mr-2 bg-gray-200 inline-block;
}

.active {
  @apply bg-cool-gray-300;
}
</style>
