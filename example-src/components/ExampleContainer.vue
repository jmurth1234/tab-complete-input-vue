<template>
  <div class="example">
    <header>
      <h3>Example</h3>

      <Button @click="this.showingSource = !this.showingSource">
        {{ !showingSource ? "View Code" : "View Component" }}
      </Button>
    </header>

    <div class="elem" v-if="showingSource">
      <Source className="code" :source="sourceCode" language="html" />
    </div>
    <div class="elem" v-if="!showingSource">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent } from "vue";
import Button from "./primitive/Button.vue";

export default defineComponent({
  components: {
    Source: defineAsyncComponent(async () => {
      const component = await import("./Source.vue");

      return component.default;
    }),
    Button
  },
  props: {
    source: { type: String }
  },
  data() {
    return {
      showingSource: false
    };
  },
  computed: {
    sourceCode() {
      return require("!!raw-loader!./" + this.source).default.split(
        "\n<style"
      )[0];
    }
  }
});
</script>

<style lang="postcss" scoped>
header {
  position: relative;
  @apply flex flex-row p-2 shadow-md;
}

.example {
  @apply rounded shadow-md z-10 bg-gray-200 my-2;
}

.elem {
  @apply p-2 bg-white z-0 overflow-y-auto;
}

::v-deep(.code) {
  @apply bg-white !important;
}

h3 {
  @apply text-2xl my-2 font-extrabold tracking-tight text-gray-900 flex-1;
}
</style>
