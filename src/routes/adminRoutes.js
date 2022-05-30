import AllUser from '../pages/Dashboard/AllUser/AllUser';
import AddAdmin from '../pages/Dashboard/AddAdmin/AddAdmin';
import AddProduct from '../pages/Dashboard/AddProduct/AddProduct';
import ManageOrders from '../pages/Dashboard/ManageOrders/ManageOrders';
import ManageProduct from '../pages/Dashboard/ManageProduct/ManageProduct';

export const adminRoutes = [
    { path: 'all-user', name: 'AllUser', Component: AllUser },
    { path: 'add-admin', name: 'AddAdmin', Component: AddAdmin },
    { path: 'add-product', name: 'AddProduct', Component: AddProduct },
    { path: 'manage-orders', name: 'ManageOrders', Component: ManageOrders },
    { path: 'manage-products', name: 'ManageProduct', Component: ManageProduct },
]