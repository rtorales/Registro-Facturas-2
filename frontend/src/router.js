import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';
import Login from '@/pages/Login/Login';
import Profile from '@/pages/Profile/Profile';
import Forgot from '@/pages/Forgot/Forgot';
import VerifyEmail from '@/pages/VerifyEmail/VerifyEmail';
import Reset from '@/pages/Reset/Reset';
import StarterPage from '@/pages/Starter/StarterPage';
import Error from '@/pages/Error/Error';

// Pages
import Dashboard from '@/pages/Dashboard/Dashboard';

import UsersTable from '@/components/CRUD/Users/UsersTable';
import UsersEdit from '@/components/CRUD/Users/UsersEdit';
import UsersNew from '@/components/CRUD/Users/UsersNew';

import ContribuyentesTable from '@/components/CRUD/Contribuyentes/ContribuyentesTable';
import ContribuyentesEdit from '@/components/CRUD/Contribuyentes/ContribuyentesEdit';
import ContribuyentesNew from '@/components/CRUD/Contribuyentes/ContribuyentesNew';

import ComprobanteTable from '@/components/CRUD/Comprobante/ComprobanteTable';
import ComprobanteEdit from '@/components/CRUD/Comprobante/ComprobanteEdit';
import ComprobanteNew from '@/components/CRUD/Comprobante/ComprobanteNew';

// Documentation
import { isAuthenticated } from './mixins/auth';
import ChangePassword from './pages/ChangePassword/ChangePassword';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: { name: 'Dashboard' } },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/forgot',
      name: 'Forgot',
      component: Forgot,
    },
    {
      path: '/password-reset',
      name: 'reset',
      component: Reset,
    },
    {
      path: '/verify-email',
      component: VerifyEmail,
    },
    {
      path: '/starter',
      name: 'starter',
      component: StarterPage,
    },
    {
      path: '/app',
      name: 'Layout',
      component: Layout,
      redirect: { name: 'Dashboard' },
      beforeEnter: (to, from, next) => {
        isAuthenticated() ? next() : next({ path: '/starter' });
      },
      children: [
        // main pages
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
        },
        {
          path: 'profile',
          name: 'Profile',
          component: Profile,
        },
        {
          path: 'password',
          name: 'Password',
          component: ChangePassword,
        },
      ],
    },
    {
      path: '/admin',
      name: 'Admin',
      redirect: { name: 'Dashboard' },
      component: Layout,
      beforeEnter: (to, from, next) => {
        isAuthenticated() ? next() : next({ path: '/login' });
      },
      children: [
        {
          path: 'users',
          name: 'Users',
          component: UsersTable,
        },
        {
          path: 'users/:id/edit',
          component: UsersEdit,
        },
        {
          path: 'users/new',
          component: UsersNew,
        },
        {
          path: 'users/:id',
          beforeEnter(from, to, next) {
            if (from.params.id === 'new') next();
            else next(`/admin/users/${from.params.id}/edit`);
          },
        },

        {
          path: 'contribuyentes',
          name: 'Contribuyentes',
          component: ContribuyentesTable,
        },
        {
          path: 'contribuyentes/:id/edit',
          component: ContribuyentesEdit,
        },
        {
          path: 'contribuyentes/new',
          component: ContribuyentesNew,
        },
        {
          path: 'contribuyentes/:id',
          beforeEnter(from, to, next) {
            if (from.params.id === 'new') next();
            else next(`/admin/contribuyentes/${from.params.id}/edit`);
          },
        },

        {
          path: 'comprobante',
          name: 'Comprobante',
          component: ComprobanteTable,
        },
        {
          path: 'comprobante/:id/edit',
          component: ComprobanteEdit,
        },
        {
          path: 'comprobante/new',
          component: ComprobanteNew,
        },
        {
          path: 'comprobante/:id',
          beforeEnter(from, to, next) {
            if (from.params.id === 'new') next();
            else next(`/admin/comprobante/${from.params.id}/edit`);
          },
        },
      ],
    },
    {
      path: '*',
      name: 'Error',
      component: Error,
    },
  ],
});
