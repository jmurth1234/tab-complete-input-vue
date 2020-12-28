<template>
  <div class="doc-example">
    <label for="tabEventsInput">
      Try tabbing these names: {{ entryPlaceholder }}
    </label>

    <button v-on:click="resetNames">{{ buttonText }}</button>

    <tab-complete-input
      ref="externalInput"
      id="tabEventsInput"
      v-model="text"
      :data-source="names"
      @keydown.enter="enterText"
      v-on:keyup="logCurrent"
    />

    <p>Entered Text: {{ enteredText }}</p>
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
    enterText(e) {
      e.preventDefault();

      this.enteredText = `${this.text}`;
      this.text = "";
    },
    logCurrent() {
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
