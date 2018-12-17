
require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router';
import { Form, HasError, AlertError } from 'vform';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
window.swal = Swal;
const toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 3000
  });
window.toast = Swal;

import VueProgressBar from 'vue-progressbar';
Vue.use(VueProgressBar, {
	color: 'rgb(143, 255, 199)',
	failedColor: 'red',
	height: '2px'
  })

window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)


window.Refresh = new Vue();

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
