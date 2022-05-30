import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateRoute from './authentication/PrivateRoute';
import AdminRoute from './authentication/AdminRoute';
import NotFound from './pages/NotFound/NotFound';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { publicRoutes } from "./routes/publicRoutes";
import { nestedRoutes } from "./routes/nestedRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import 'antd/dist/antd.css';



function App() {

  return (
    <>
      <ScrollToTop />
      <Routes>
        {publicRoutes.map(({ path, Component }, index) => (
          <Route key={index} path={path} element={<Component />} />))}

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />}>
            {nestedRoutes.map(({ path, Component, name }, index) => (
              <Route key={index} path={path} index={name === 'WelcomeToDashboard'} element={<Component />} />))}
            {/* Admin routes */}
            <Route element={<AdminRoute />}>
              {adminRoutes.map(({ path, Component }, index) => (
                <Route key={index} path={path} element={<Component />} />))}
            </Route>
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
