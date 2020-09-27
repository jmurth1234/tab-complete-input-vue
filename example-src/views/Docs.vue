<script lang="ts">
import { defineComponent } from "vue";

import BasicExample from "../components/BasicExample.vue";
import TabExample from "../components/TabExample.vue";
import AsyncExample from "../components/AsyncExample.vue";
import FormatExample from "../components/FormatExample.vue";
import ValueExample from "../components/ValueExample.vue";
import ExampleContainer from "../components/ExampleContainer.vue";
import Prism from "prismjs";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const docs = require("../../docs/docs.md");

export default defineComponent({
  template: `${docs}`,
  components: {
    BasicExample,
    AsyncExample,
    FormatExample,
    ExampleContainer,
    ValueExample,
    TabExample
  },
  mounted() {
    Prism.highlightAll();
  }
});
</script>
