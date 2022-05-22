import { Route, Routes } from 'react-router-dom';
// import Navbar from "./components/shared/Navbar";
import Home from './pages/Home/Home';
import Products from './pages/Home/Products';
import 'antd/dist/antd.css';
import './App.css';
// import Footer from './components/shared/Footer';
import Login from './pages/Login/Login';

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
