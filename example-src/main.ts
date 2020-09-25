import { createApp } from "vue";

import App from "./App.vue";

import './assets/styles/main.css'
import 'prismjs/themes/prism.css'

import routes from "./router";

createApp(App)
  .use(routes)
  .mount("#app");
