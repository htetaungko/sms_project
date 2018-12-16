
require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router';
import { Form, HasError, AlertError } from 'vform';

window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

Vue.use(VueRouter);

let routes = [
	{ path: '/dashboard', component: require('./components/Dashboard.vue')},
	{ path: '/profile', component: require('./components/Profile.vue')},
	{ path: '/classes', component: require('./components/setting/Classes.vue')},
	{ path: '/students', component: require('./components/setting/Students.vue')}
];

const router = new VueRouter({
	routes
})

Vue.component('example-component', require('./components/ExampleComponent.vue'));






const app = new Vue({
    el: '#app',
    router
});
