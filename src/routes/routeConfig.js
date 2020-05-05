import React from 'react';

const Acercade = React.lazy(() => import('components/views/info'))
const Inicio = React.lazy(() => import('components/forms/Home'))
const Anexo = React.lazy(() => import('components/forms/Maestros/Anexo'))

const routes = [
	{ id: '0', path: '/inicio', exact: true, name: 'Inicio', component: Inicio },
	{ id: '1', path: '/acercade', exact: true, name: 'Acerca de', component: Acercade },
	{ id: '2', path: '/smnuAnexo', exact: true, name: 'Anexo', component: Anexo }
];

export default routes;