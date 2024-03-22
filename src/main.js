import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {createMemoryHistory, createRouter} from "vue-router";
import AllGoods from "@/components/goods/AllGoods.vue";
import AllGoodsComposition from "@/components/goods-composition/AllGoodsComposition.vue";
import AllTechMap from "@/components/tech-map/AllTechMap.vue";
import AllTechMapComposition from "@/components/tech-map-composition/AllTechMapComposition.vue";
import AllDish from "@/components/dish/AllDish.vue";
import AllOrder from "@/components/order/AllOrder.vue";
import RegisterUser from "@/components/users/RegisterUser.vue";
import AuthorizeUser from "@/components/users/AuthorizeUser.vue";

const vuetify = createVuetify({
    components,
    directives,
})

const routes = [
    { path: '/goods', component: AllGoods },
    { path: '/goods-composition', component: AllGoodsComposition },
    { path: '/tech-map', component: AllTechMap },
    { path: '/tech-map-composition', component: AllTechMapComposition },
    { path: '/register', component: RegisterUser },
    { path: '/auth', component: AuthorizeUser },
    { path: '/dish', component: AllDish },
    { path: '/order', component: AllOrder }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

createApp(App).use(vuetify).use(router).mount('#app')
