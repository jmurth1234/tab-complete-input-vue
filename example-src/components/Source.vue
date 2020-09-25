<template>
  <pre v-html="htmlSource" />
</template>

<script>
import Prism from "prismjs";

export default {
  props: ["source"],
  computed: {
    htmlSource() {
      return Prism.highlight(this.source, Prism.languages.html, "html");
    }
  }
};
</script>

<style lang="postcss">
pre {
  @apply font-mono max-h-96 overflow-y-auto;
}
</style>
