import Home from '../pages/Home/Home';
import Products from '../pages/Home/Products';
import Login from '../pages/Login/Login';
import Register from '../pages/Login/Register';
import ProductDetails from '../pages/ProductDetail/ProductDetails';
import MyPortfolio from '../pages/MyPortfolio/MyPortfolio';
import Blog from '../pages/Blog/Blog';
import ResetPassword from '../pages/ResetPassword/ResetPassword';

export const publicRoutes = [
    { path: "/", name: "Home", Component: Home },
    { path: "/home", name: "Home", Component: Home },
    { path: "/products", name: "Products", Component: Products },
    { path: "/login", name: "Login", Component: Login },
    { path: "/register", name: "Register", Component: Register },
    { path: "/blog", name: "Blog", Component: Blog },
    { path: "/portfolio", name: "Portfolio", Component: MyPortfolio },
    { path: "/reset-password", name: "ResetPassword", Component: ResetPassword },
    { path: "/product-details/:id", name: "ProductDetails", Component: ProductDetails },
]
