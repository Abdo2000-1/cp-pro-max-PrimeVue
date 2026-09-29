import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/components/layout/Layout.vue';

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/Dashboard.vue'),
      },
      {
        path: 'cards',
        name: 'AuraCards',
        component: () => import('@/pages/AuraCards.vue'),
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('@/pages/Orders.vue'),
      },
      {
        path: 'orders/create',
        name: 'CreateOrder',
        component: () => import('@/pages/CreateOrder.vue'),
      },
      {
        path: 'orders/:id',
        name: 'ViewOrder',
        component: () => import('@/pages/ViewOrder.vue'),
      },
      {
        path: 'orders/:id/edit',
        name: 'EditOrder',
        component: () => import('@/pages/EditOrder.vue'),
      },
      {
        path: 'cases',
        name: 'Cases',
        component: () => import('@/pages/Cases.vue'),
      },
      {
        path: 'cases/:id',
        name: 'CaseDetails',
        component: () => import('@/pages/CaseDetails.vue'),
      },
      {
        path: 'scan-center',
        name: 'ScanCenter',
        component: () => import('@/pages/ScanCenter.vue'),
      },
      {
        path: 'workflow-board',
        name: 'WorkflowBoard',
        component: () => import('@/pages/WorkflowBoard.vue'),
      },
      {
        path: 'patients',
        name: 'Patients',
        component: () => import('@/pages/Patients.vue'),
      },
      {
        path: 'patients/:id',
        name: 'PatientDetails',
        component: () => import('@/pages/PatientDetails.vue'),
      },
      {
        path: 'doctors',
        name: 'Doctors',
        component: () => import('@/pages/Doctors.vue'),
      },
      {
        path: 'doctors/:id',
        name: 'DoctorDetails',
        component: () => import('@/pages/DoctorDetails.vue'),
      },
      {
        path: 'clinics',
        name: 'Clinics',
        component: () => import('@/pages/Clinics.vue'),
      },
      {
        path: 'clinics/:id',
        name: 'ClinicDetails',
        component: () => import('@/pages/ClinicDetails.vue'),
      },
      {
        path: 'billing',
        name: 'Billing',
        component: () => import('@/pages/Billing.vue'),
      },
      {
        path: 'change-requests',
        name: 'ChangeRequests',
        component: () => import('@/pages/ChangeRequests.vue'),
      },
      {
        path: 'documents',
        name: 'Documents',
        component: () => import('@/pages/Documents.vue'),
      },
      {
        path: 'reports',
        name: 'Reports',
        component: () => import('@/pages/Reports.vue'),
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/pages/Settings.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
