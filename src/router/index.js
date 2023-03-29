import Vue from 'vue'
import VueRouter from 'vue-router'
import AceEditor from "@/components/AceEditor";


Vue.use(VueRouter)

const routes = [
    {
        path: '/codeId',
        name: 'codeId',
        component: AceEditor
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
