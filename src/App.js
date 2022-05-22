import { Route, Routes } from 'react-router-dom';
import Navbar from "./components/shared/Navbar";
import Home from './pages/Home/Home';
import 'antd/dist/antd.css';
import './App.css';
import Products from './pages/Home/Products';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/products' element={<Products />} />
      </Routes>
    </div>
  );
}

export default App;
