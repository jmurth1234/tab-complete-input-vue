<template>
  <div class="doc-example">
    <label for="tabHomeInput">
      Try tabbing these names: {{ entryPlaceholder }}. You can also start a word
      with @ to complete as you type.
    </label>

    <button v-on:click="resetNames">{{ buttonText }}</button>

    <div class="input-container">
      <div class="dropdown" v-if="completions.length > 0">
        <a
          v-for="(completion, i) in completions"
          href="#"
          v-bind:key="i"
          v-bind:class="{ active: current == i }"
          @click="() => chooseCompletion(i)"
        >
          {{ completion }}
        </a>
      </div>

      <tab-complete-input
        id="tabHomeInput"
        ref="input"
        v-model="text"
        :data-source="names"
        @tab-failed="onTabFailed"
        @tab-ended="onTabFailed"
        @tab-success="onTabSuccess"
        @selection-changed="onTabSuccess"
      />
    </div>
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

<style lang="postcss" scoped src="../assets/styles/examples.postcss" />
