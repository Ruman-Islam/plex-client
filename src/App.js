import { Route, Routes } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import Home from './pages/Home/Home';
import Products from './pages/Home/Products';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Purchase from './pages/Dashboard/Purchase/Purchase';
import PrivateRoute from './authentication/PrivateRoute';
import MyProfile from './pages/Dashboard/Account/MyProfile';
import MyOrders from './pages/Dashboard/MyOrders/MyOrders';
import AddReview from './pages/Dashboard/AddReview/AddReview';
import EditProfile from './pages/Dashboard/Account/EditProfile';
import ProductDetails from './pages/ProductDetail/ProductDetails';
import AdminRoute from './authentication/AdminRoute';
import AllUser from './pages/Dashboard/AllUser/AllUser';
import NotFound from './pages/NotFound/NotFound';
import AddAdmin from './pages/Dashboard/AddAdmin/AddAdmin';
import AddProduct from './pages/Dashboard/AddProduct/AddProduct';
import MyPortfolio from './pages/MyPortfolio/MyPortfolio';
import Blog from './pages/Blog/Blog';
import ManageOrders from './pages/Dashboard/ManageOrders/ManageOrders';
import ManageProduct from './pages/Dashboard/ManageProduct/ManageProduct';
import auth from './firebase/firebaseConfig';
import useAdmin from './hooks/useAdmin';
import 'antd/dist/antd.css';
import './App.css';

function App() {
  const [user, ,] = useAuthState(auth);
  const { admin } = useAdmin(user);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/product-details/:id' element={<ProductDetails />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/portfolio' element={<MyPortfolio />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }>
          <Route path='purchase/:id' element={<Purchase />} />
          {admin ? <Route index element={
            <AdminRoute>
              <AllUser />
            </AdminRoute>}
          /> :
            <Route index element={<MyOrders />} />}
          <Route path='my-orders' element={<MyOrders />} />
          <Route path='profile' element={<MyProfile />} />
          <Route path='edit-profile' element={<EditProfile />} />
          <Route path='add-review' element={<AddReview />} />
          <Route path='all-user' element={
            <AdminRoute>
              <AllUser />
            </AdminRoute>}
          />
          <Route path='add-admin' element={
            <AdminRoute>
              <AddAdmin />
            </AdminRoute>}
          />
          <Route path='add-product' element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>}
          />
          <Route path='manage-orders' element={
            <AdminRoute>
              <ManageOrders />
            </AdminRoute>}
          />
          <Route path='manage-products' element={
            <AdminRoute>
              <ManageProduct />
            </AdminRoute>}
          />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
