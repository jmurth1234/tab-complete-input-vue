<template>
  <div class="doc-example">
    <label for="tabInput">
      Try tabbing these names: {{ entryPlaceholder }}
    </label>

    <button v-on:click="resetNames">{{ buttonText }}</button>

    <tab-complete-input
      ref="externalInput"
      id="tabInput"
      v-model="text"
      :data-source="names"
    />

    <label>Entered text: {{ text }}</label>
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

<style lang="postcss" scoped src="../assets/styles/examples.postcss"></style>
