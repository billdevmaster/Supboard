import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import GuestGuard from './components/Auth/GuestGuard';
import AuthGuard from './components/Auth/AuthGuard';

import { BASE_URL } from './config/constant';

export const renderRoutes = (routes = []) => (
    <Suspense fallback={<Loader />}>
        <Switch>
            {routes.map((route, i) => {
                const Guard = route.guard || Fragment;
                const Layout = route.layout || Fragment;
                const Component = route.component;

                return (
                    <Route
                        key={i}
                        path={route.path}
                        exact={route.exact}
                        render={(props) => (
                            <Guard>
                                <Layout>{route.routes ? renderRoutes(route.routes) : <Component {...props} />}</Layout>
                            </Guard>
                        )}
                    />
                );
            })}
        </Switch>
    </Suspense>
);

const routes = [
    {
        exact: true,
        guard: GuestGuard,
        path: '/auth/signin',
        component: lazy(() => import('./views/auth/signin/SignIn2'))
    },
    {
        exact: true,
        guard: GuestGuard,
        path: '/auth/signup',
        component: lazy(() => import('./views/auth/signup/SignUp2'))
    },
    {
        path: '*',
        layout: AdminLayout,
        guard: AuthGuard,
        routes: [
            {
                exact: true,
                path: '/dashboard',
                component: lazy(() => import('./views/dashboard/DashDefault'))
            },
            {
                exact: true,
                path: '/location',
                component: lazy(() => import('./views/location'))
            },
            {
                exact: true,
                path: '/location/edit/:id',
                component: lazy(() => import('./views/location/edit'))
            },
            {
                exact: true,
                path: '/locker',
                component: lazy(() => import('./views/locker'))
            },
            {
                exact: true,
                path: '/locker/edit/:id',
                component: lazy(() => import('./views/locker/edit'))
            },
            {
                exact: true,
                path: '/booking',
                component: lazy(() => import('./views/booking'))
            },
            {
                exact: true,
                path: '/requests',
                component: lazy(() => import('./views/requests'))
            },
            {
                exact: true,
                path: '/instructions',
                component: lazy(() => import('./views/instructions'))
            },
            {
                exact: true,
                path: '/liability-waiver',
                component: lazy(() => import('./views/liability-waiver'))
            },
            {
                exact: true,
                path: '/event',
                component: lazy(() => import('./views/event'))
            },
            {
                exact: true,
                path: '/customer',
                component: lazy(() => import('./views/customer'))
            },
            {
                exact: true,
                path: '/equipment',
                component: lazy(() => import('./views/equipment'))
            },
            {
                exact: true,
                path: '/settings/price',
                component: lazy(() => import('./views/settings/price'))
            },
            {
                exact: true,
                path: '/settings/price/edit/:id',
                component: lazy(() => import('./views/settings/price/edit'))
            },
            {
                exact: true,
                path: '/settings/station',
                component: lazy(() => import('./views/settings/station'))
            },
            {
                exact: true,
                path: '/settings/station/edit/:id',
                component: lazy(() => import('./views/settings/station/edit'))
            },
            {
                exact: true,
                path: '/settings/terrain',
                component: lazy(() => import('./views/settings/terrain'))
            },
            {
                exact: true,
                path: '/settings/terrain/edit/:id',
                component: lazy(() => import('./views/settings/terrain/edit'))
            },
            {
                exact: true,
                path: '/settings/review',
                component: lazy(() => import('./views/settings/review'))
            },


            {
                exact: true,
                path: '/basic/button',
                component: lazy(() => import('./views/ui-elements/basic/BasicButton'))
            },
            {
                exact: true,
                path: '/basic/badges',
                component: lazy(() => import('./views/ui-elements/basic/BasicBadges'))
            },
            {
                exact: true,
                path: '/basic/breadcrumb',
                component: lazy(() => import('./views/ui-elements/basic/BasicBreadcrumb'))
            },
            {
                exact: true,
                path: '/basic/collapse',
                component: lazy(() => import('./views/ui-elements/basic/BasicCollapse'))
            },
            {
                exact: true,
                path: '/basic/tabs-pills',
                component: lazy(() => import('./views/ui-elements/basic/BasicTabsPills'))
            },
            {
                exact: true,
                path: '/basic/typography',
                component: lazy(() => import('./views/ui-elements/basic/BasicTypography'))
            },

            {
                exact: true,
                path: '/forms/form-basic',
                component: lazy(() => import('./views/forms/FormsElements'))
            },
            {
                exact: true,
                path: '/tables/bootstrap',
                component: lazy(() => import('./views/tables/BootstrapTable'))
            },

            {
                exact: true,
                path: '/charts/nvd3',
                component: lazy(() => import('./views/charts/nvd3-chart'))
            },
            {
                exact: true,
                path: '/maps/google-map',
                component: lazy(() => import('./views/maps/GoogleMaps'))
            },

            {
                exact: true,
                path: '/sample-page',
                component: lazy(() => import('./views/extra/SamplePage'))
            },
            {
                path: '*',
                exact: true,
                component: () => <Redirect to={BASE_URL} />
            }
        ]
    }
];

export default routes;
