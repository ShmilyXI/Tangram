export default [
  {
    path: '/',
    component: '@/layout/index',
    routes: [
      { path: '/', redirect: '/form-editor', exact: true },
      {
        path: '/form-editor',
        component: '@/pages/form-editor/index',
        title: 'form-editor',
        exact: true,
      },
    ],
  },
];
