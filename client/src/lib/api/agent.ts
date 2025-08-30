import axios from "axios";
import { store } from "../stores/store";
const sleep = (delay: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay)
    })
}
const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

agent.interceptors.response.use(async response => {
    try {
        await sleep(1000)
        return response
    }
    catch (err) {
        console.log(err)
        return Promise.reject(err)
    }
    finally {
        store.uiStore.isIdle();
    }
})

agent.interceptors.request.use(config => {
    store.uiStore.isBusy();
    return config
})

export default agent