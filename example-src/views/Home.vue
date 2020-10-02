<template>
  <div class="home">
    <ExampleContainer :source="'HomeExample.vue'">
      <HomeExample />
    </ExampleContainer>

    <h2>Downloading</h2>

    <div class="ex-container">
      <Source language="bash" source="yarn add vue-tab-complete-input" />
    </div>

    <h2>Using</h2>

    <div class="ex-container">
      <Source language="html" :source="str" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";
import HomeExample from "../components/HomeExample.vue";
import ExampleContainer from "../components/ExampleContainer.vue";

export default defineComponent({
  name: "App",
  components: {
    HomeExample,
    ExampleContainer,
    Source: defineAsyncComponent(async () => {
      const component = await import("../components/Source.vue");

      return component.default;
    })
  },
  data() {
    return {
      str: require("!!raw-loader!../snippets/example.html").default
    };
  }
});
</script>
