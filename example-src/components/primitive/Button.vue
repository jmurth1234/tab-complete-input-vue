<script lang="ts">
import { h } from "vue";
import { RouterLink } from "vue-router";

const Button = (props: any, context: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let component: any = "a";

  if (!props.href) {
    component = "button";
  }

  if (props.to) {
    component = RouterLink;
  }

  if (!context.slots.default) {
    return null;
  }

  return h(
    component,
    { ...props, ...context.attr, className: "button" },
    context.slots.default()
  );
};

Button.props = ["href", "to"];

export default Button;
</script>

<style scoped>
.button {
  background: crimson;
}
</style>

<!--
<style lang="postcss" scoped>
.button {
  @apply bg-indigo-600 px-8 py-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white transition duration-150 ease-in-out inline;
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
</style>-->
