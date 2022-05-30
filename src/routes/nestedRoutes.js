import Purchase from '../pages/Dashboard/Purchase/Purchase';
import MyProfile from '../pages/Dashboard/Account/MyProfile';
import MyOrders from '../pages/Dashboard/MyOrders/MyOrders';
import AddReview from '../pages/Dashboard/AddReview/AddReview';
import EditProfile from '../pages/Dashboard/Account/EditProfile';
import DirectPurchase from '../pages/Dashboard/DirectPurchase/DirectPurchase';
import WelcomeToDashboard from '../pages/Dashboard/WelcomeToDashboard/WelcomeToDashboard';

export const nestedRoutes = [
    { name: "WelcomeToDashboard", Component: WelcomeToDashboard },
    { path: "purchase/:productId/:bookedProductId", name: "Purchase", Component: Purchase },
    { path: "direct-purchase/:productId", name: "DirectPurchase", Component: DirectPurchase },
    { path: "my-orders", name: "MyOrders", Component: MyOrders },
    { path: "profile", name: "MyProfile", Component: MyProfile },
    { path: "edit-profile", name: "EditProfile", Component: EditProfile },
    { path: "add-review", name: "AddReview", Component: AddReview }
]