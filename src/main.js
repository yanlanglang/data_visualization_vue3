import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";

//路由
import router from "./router/index";
//axios
import axios from "./request/request";
//arco组件库
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
//element-plus图标库
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
//echarts
import * as echarts from "echarts";

//创建App对象
const app = createApp(App);

//添加图标库
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

//导入挂载的属性
app.provide("$echarts", echarts);
app.provide("$axios", axios);

//添加路由、arco组件库
app.use(router).use(ArcoVue);

app.mount("#app");
