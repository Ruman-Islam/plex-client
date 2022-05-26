import { Route, Routes } from 'react-router-dom';
// import Navbar from "./components/shared/Navbar";
import Home from './pages/Home/Home';
import Products from './pages/Home/Products';
import 'antd/dist/antd.css';
import './App.css';
// import Footer from './components/shared/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Purchase from './pages/Dashboard/Purchase/Purchase';
import PrivateRoute from './authentication/PrivateRoute';
import MyProfile from './pages/Dashboard/Account/MyProfile';
import MyOrders from './pages/Dashboard/MyOrders';
import AddReview from './pages/Dashboard/AddReview/AddReview';
import EditProfile from './pages/Dashboard/Account/EditProfile';
import ProductDetails from './pages/ProductDetail/ProductDetails';
import AdminRoute from './authentication/AdminRoute';
import AllUser from './pages/Dashboard/AllUser/AllUser';
import NotFound from './pages/NotFound/NotFound';
import AddAdmin from './pages/Dashboard/AddAdmin/AddAdmin';

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/product-details/:id' element={<ProductDetails />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }>
          <Route path='purchase/:id' element={<Purchase />} />
          <Route index element={<MyOrders />} />
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
            <AddAdmin>
              <AllUser />
            </AddAdmin>}
          />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
