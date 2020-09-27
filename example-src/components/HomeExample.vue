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

<style lang="postcss" scoped src="../assets/styles/examples.postcss" />