<script lang="ts">
import { Component, defineComponent, h } from "vue";
import { RouterLink } from "vue-router";

export default defineComponent({
  name: "Button",
  props: ["href", "to"],
  render() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let component: any = "a";

    if (!this.$props.href) {
      component = "button";
    }

    if (this.$props.to) {
      component = RouterLink;
    }

    if (!this.$slots.default) {
      return null;
    }

    return h(
      component,
      {
        ...this.$props,
        ...this.$attrs
      },
      this.$slots.default()
    );
  }
});
</script>

<style lang="postcss" scoped>
a {
  @apply bg-indigo-600 px-8 py-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white transition duration-150 ease-in-out inline;
}

a:hover {
  @apply bg-indigo-500;
}

a:active {
  @apply bg-indigo-700;
}

a:focus {
  @apply border-indigo-700 outline-none shadow-outline-indigo;
}
</style>
