<template>
  <div class="example">
    <header>
      <h3>Example</h3>

      <button @click="this.showingSource = !this.showingSource">
        {{ !showingSource ? "View Code" : "View Component" }}
      </button>
    </header>

    <div class="elem code" v-if="showingSource">
      <Source :source="sourceCode" />
    </div>
    <div class="elem" v-if="!showingSource">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent } from "vue";

export default defineComponent({
  components: {
    Source: defineAsyncComponent(async () => {
      const component = await import("./Source.vue");

      return component.default;
    })
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
        "<style"
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
  @apply border-solid border-gray-200 border rounded shadow-sm z-10 bg-gray-200 my-2;
}

.elem {
  @apply p-2 bg-white z-0;
}

h3 {
  @apply text-2xl my-2 font-extrabold tracking-tight text-gray-900 flex-1;
}

button {
  @apply bg-indigo-600 px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white transition duration-150 ease-in-out inline;
}

button:hover {
  @apply bg-indigo-500;
}

button:active {
  @apply bg-indigo-700;
}

button:focus {
  @apply border-indigo-700 outline-none shadow-outline-indigo;
}
</style>