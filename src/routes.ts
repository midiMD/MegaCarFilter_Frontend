import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { ListingDetail } from './components/ListingDetail';
import { ManageTrackers } from './components/ManageTrackers';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'listing/:id', Component: ListingDetail },
      { path: 'manage-trackers', Component: ManageTrackers },
    ],
  },
]);
