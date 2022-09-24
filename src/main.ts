import { createApp } from 'vue'
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
import { HubConnectionBuilder } from '@microsoft/signalr';
const signalR = require("@microsoft/signalr");
ace.config.set(
    "basePath",
    "https://cdn.jsdelivr.net/npm/ace-builds@" +
    require("ace-builds").version +
    "/src-noconflict/"
);

/*const connection = new HubConnectionBuilder()
    .withUrl("/livecoding")//'https://musicoverflowapi.azurewebsites.net/livecoding')
    .build();*/

const connection = new HubConnectionBuilder().withUrl("https://localhost:7143/livecoding",{
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets}).build();
connection.start().then(() => {
    connection.invoke("JoinGroup",null).then(r => console.log(r)).catch(function (err) {
        return console.error(err.toString());
    });
})

createApp(App)
    .use(store)
    .use(router)
    .use(PrimeVue)
    .use(ToastService)
    .use(VueSignalR, {connection,start: true})
    .mount('#app')
