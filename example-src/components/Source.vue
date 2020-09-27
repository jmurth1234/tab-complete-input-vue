<template>
  <pre :class="className" v-html="htmlSource" />
</template>

<script>
import Prism from "prismjs";

// eslint-disable-next-line @typescript-eslint/no-var-requires
Prism.languages.bash = require("prismjs/components/prism-bash");

export default {
  props: ["source", "language", "className"],
  computed: {
    htmlSource() {
      return Prism.highlight(
        this.source || this.$slots.default()[0].children,
        Prism.languages[this.language],
        this.language
      );
    }
  }
};
</script>
