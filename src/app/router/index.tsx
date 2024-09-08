import { PageLayout } from 'common/components/layouts/PageLayout';
import { PATHS } from 'common/consts/paths';
import { AdvertisementDetail } from 'pages/AdvertisementDetail';
import { AdvertisementsPage } from 'pages/Advertisements';
import { OrderDetailPage } from 'pages/OrderDetail';
import { OrdersPage } from 'pages/Orders';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<PageLayout />} path='/'>
            <Route element={<AdvertisementsPage />} path={PATHS.ADVERTISEMENTS} />
            <Route element={<AdvertisementDetail />} path={`${PATHS.ADVERTISEMENT_DETAIL}`} />

            <Route element={<OrdersPage />} path={PATHS.ORDERS} />
            <Route element={<OrderDetailPage />} path={PATHS.ORDER_DETAIL} />
        </Route>,
    ),
);
