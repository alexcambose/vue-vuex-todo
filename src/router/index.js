import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Buefy from 'buefy';
import Vuex from 'vuex';
import 'buefy/lib/buefy.css';

Vue.use(Buefy);
Vue.use(Router);
Vue.use(Vuex);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
  ],
});
