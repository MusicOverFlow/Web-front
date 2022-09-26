import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import store from './store'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import ace from "ace-builds"
import ToastService from 'primevue/toastservice';
import {useSignalR, VueSignalR} from '@dreamonkey/vue-signalr';
import {HubConnection, HubConnectionBuilder} from '@microsoft/signalr';
import userStore from "@/store/user"

const signalR = require("@microsoft/signalr");
ace.config.set(
    "basePath",
    "https://cdn.jsdelivr.net/npm/ace-builds@" +
    require("ace-builds").version +
    "/src-noconflict/"
);

// "https://musicoverflowapi.azurewebsites.net/livecoding"
// "https://localhost:7143/livecoding"
const connection = new HubConnectionBuilder().withUrl("https://localhost:7143/livecoding", {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets
}).build()


// @ts-ignore
connection.start()

export default connection;
createApp(App)
    .use(store)
    .use(router)
    .use(PrimeVue)
    .use(ToastService)
    .use(VueSignalR, {connection})
    .mount('#app')
