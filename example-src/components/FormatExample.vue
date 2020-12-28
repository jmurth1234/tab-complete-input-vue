<template>
  <div class="doc-example">
    <label for="tabFormatInput">
      Try tabbing these names: {{ entryPlaceholder }}
    </label>

    <button v-on:click="resetNames">{{ buttonText }}</button>

    <tab-complete-input
      id="tabFormatInput"
      v-model="text"
      :data-source="names"
      :format="getFormat"
    />
  </div>
</template>

<script>
import TabCompleteInput from "../../src/tab-complete-input";
import { getFormat, staticList } from "./shared";

export default {
  components: { TabCompleteInput },
  data() {
    return {
      names: staticList.sort(),
      text: "",
      buttonText: "Change Names"
    };
  },
  methods: {
    getFormat,
    async resetNames() {
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
