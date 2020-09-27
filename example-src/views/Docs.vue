<script lang="ts">
import { defineComponent } from "vue";

import BasicExample from "../components/BasicExample.vue";
import AsyncExample from "../components/AsyncExample.vue";
import FormatExample from "../components/FormatExample.vue";
import Prism from "prismjs";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const docs = require("../../docs/docs.md");

export default defineComponent({
  template: `<div class="docs">${docs}</div>`,
  components: { BasicExample, AsyncExample, FormatExample },
  mounted() {
    Prism.highlightAll();
  }
});
</script>

<style lang="postcss">
.docs {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;

  max-width: 800px;
  margin: 0 auto;
}

header {
  @apply p-4 text-center;
}

h1 {
  @apply my-4 text-3xl leading-8 font-extrabold tracking-tight text-gray-900;
}

h2 {
  @apply mt-8 mb-2 text-2xl leading-8 font-extrabold tracking-tight text-gray-800;
}

.ex-container {
  @apply rounded shadow-sm z-10 bg-gray-200 p-2;
}

.buttons a {
  @apply mx-2;
}
</style>
