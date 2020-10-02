<template>
  <component class="button" :is="component" v-bind="this" :to="to" :href="href">
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, h } from "vue";
import { RouterLink } from "vue-router";

export default defineComponent({
  data() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let component: any = "a";

    if (!this.href) {
      component = "button";
    }

    if (this.to) {
      component = RouterLink;
    }

    return {
      component
    };
  },
  props: ["to", "href"]
});
</script>

<style lang="postcss" scoped>
.button {
  @apply bg-indigo-600 px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white transition duration-150 ease-in-out inline;
}

.button:hover {
  @apply bg-indigo-500;
}

.button:active {
  @apply bg-indigo-700;
}

.button:focus {
  @apply border-indigo-700 outline-none shadow-outline-indigo;
}
</style>
