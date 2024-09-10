import { PageLayout } from 'common/components/layouts/PageLayout';
import { PATHS } from 'common/consts/paths';
import { AdvertisementsPage, AdvertisementDetailPage } from 'pages/Advertisements';
import { OrdersPage, OrderDetailPage } from 'pages/Orders';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<PageLayout />} path='/'>

            <Route element={<Navigate to={PATHS.ADVERTISEMENTS} />} index />
            
            <Route path={PATHS.ADVERTISEMENTS}>
                <Route element={<AdvertisementsPage />} index />
                <Route element={<AdvertisementDetailPage />} path=':id' />
            </Route>

            <Route path={PATHS.ORDERS}>
                <Route element={<OrdersPage />} index />
                <Route element={<OrderDetailPage />} path=':id' />
            </Route>

        </Route>,
    ),
);
