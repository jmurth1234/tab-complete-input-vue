<template>
  <pre v-html="htmlSource" />
</template>

<script>
import Prism from "prismjs";

// eslint-disable-next-line @typescript-eslint/no-var-requires
Prism.languages.bash = require("prismjs/components/prism-bash");

export default {
  props: ["source", "language"],
  computed: {
    htmlSource() {
      console.log(Prism.languages);
      return Prism.highlight(
        this.source,
        Prism.languages[this.language],
        this.language
      );
    }
  }
};
</script>

<style lang="postcss">
pre {
  @apply font-mono max-h-96 overflow-y-auto;
}
</style>
