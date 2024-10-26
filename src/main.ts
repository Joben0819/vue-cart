import { createApp } from 'vue'

import 'bootstrap/dist/css/bootstrap.css'

import 'bootstrap'
import './style.css'
import App from './App.vue'
import router from './router/router';
import store,{persistor} from './store/store'

import { library } from '@fortawesome/fontawesome-svg-core';

// Import Font Awesome Icon component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Import specific icons
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faHouse, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// Add icons to the library
library.add(faCartShopping);
library.add(faHouse, faMagnifyingGlass);



const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.provide('store',store)
app.provide('persistor',persistor)
app.use(router)
app.mount('#app')
