import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from 'axios'

Vue.config.productionTip = false;

import './axios'

Vue.use(ElementUI);
Vue.use(Vuex);
Vue.prototype.$axios = axios
const store = new Vuex.Store({
    state: {
        tabName: "",
    },
    mutations: {
        changeTab(state, tabName) {
            state.tabName = tabName;
        },
    },
});

new Vue({
    render: (h) => h(App),
    store: store,
}).$mount("#app");
