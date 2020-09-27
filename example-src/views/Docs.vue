<script lang="ts">
import { defineComponent } from "vue";

import BasicExample from "../components/BasicExample.vue";
import AsyncExample from "../components/AsyncExample.vue";
import FormatExample from "../components/FormatExample.vue";
import ExampleContainer from "../components/ExampleContainer.vue";
import Prism from "prismjs";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const docs = require("../../docs/docs.md");

export default defineComponent({
  template: `<div class="docs">${docs}</div>`,
  components: { BasicExample, AsyncExample, FormatExample, ExampleContainer },
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

</style>
