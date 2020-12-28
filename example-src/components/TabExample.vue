<template>
  <div class="doc-example">
    <label for="tabTouchInput">
      Try tabbing these names: {{ entryPlaceholder }}
    </label>

    <div class="tab">
      <tab-complete-input
        class="round-l"
        id="tabTouchInput"
        ref="input"
        v-model="text"
        :data-source="names"
      />
      <button @click="tab">Tab</button>
    </div>

    <button class="round-4" v-on:click="resetNames">{{ buttonText }}</button>
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
      this.$refs.input.handleTabPressed();
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
