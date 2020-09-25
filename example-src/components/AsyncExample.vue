<template>
  <div class="doc-example">
    <p>
      <label for="tabInput">{{ entryPlaceholder }}</label>
    </p>
    <p>
      <tab-complete-input
        id="tabInput"
        v-model="text"
        :data-source="asyncData"
      />
    </p>
  </div>
</template>

<script>
import { staticList } from "./shared";
import TabCompleteInput from "../../src/tab-complete-input";

const api = "/.netlify/functions/get-names";

export default {
  components: { TabCompleteInput },
  data() {
    return {
      text: ""
    };
  },
  methods: {
    async asyncData(word, position) {
      const request = await fetch(
        `${api}?word=${encodeURIComponent(word)}&pos=${encodeURIComponent(
          position
        )}`
      );
      return request.json();
    }
  },
  computed: {
    entryPlaceholder() {
      return `Try tabbing these names: ${staticList.sort().join(", ")}`;
    }
  }
};
</script>
