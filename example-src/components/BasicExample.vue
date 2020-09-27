<template>
  <div class="doc-example">
    <label for="tabInput">
      Try tabbing these names: {{ entryPlaceholder }}
    </label>

    <button v-on:click="resetNames">{{ buttonText }}</button>

    <tab-complete-input
      ref="externalInput"
      id="tabInput"
      :data-source="names"
    />
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

<style lang="postcss" scoped src="../assets/styles/examples.postcss"></style>
