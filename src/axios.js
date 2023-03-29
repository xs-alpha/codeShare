import axios from 'axios'
import Element from 'element-ui'
import store from './store'
import router from './router'

// axios.defaults.baseURL = "http://localhost:9090"  // 注意请开启springboot 不然数据有可能无法访问。
axios.defaults.baseURL = "http://codeShare.devilwst.top:28769"  // 注意请开启springboot 不然数据有可能无法访问。
axios.defaults.timeout = 3000;
// 前置拦截
axios.interceptors.request.use(config => {
    return config
})

// 后置拦截
axios.interceptors.response.use(response => {
        let res = response.data
        const isImg = response.headers["content-type"] === "image/jpeg" || response.headers["content-type"] === "blob"
        console.log(response.headers["content-type"], "----", isImg)
        if (res.status === 200 || res.code === 200 || isImg) {
            return response
        } else {
            Element.Message.error(res.msg, {duration: 3 * 1000});
            //阻止返回s
            console.log("route", res.msg)
            return Promise.reject(response.data.msg)
        }
    },
    error => {

        if (error.response.data) {
            error.messgae = error.response.data.msg
        }

        //如果是无认证
        if (error.response.status === 401) {
            store.commit('rmUserInfo')
            router.push('/login')
        } else { // 如果是认证错误
            Element.Message.error(error.messgae, {duration: 3 * 1000})
            return Promise.reject(error)
        }
    }
)
