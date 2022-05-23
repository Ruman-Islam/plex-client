import { Popconfirm } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import useNav from '../../hooks/useNav';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebaseConfig';
import Navbar from '../shared/Navbar';

const Sidebar = () => {
    const { navbar } = useNav();
    const [user, ,] = useAuthState(auth);
    const navigate = useNavigate();
    return (
        <aside className='bg-base-100 2xl:w-48 h-screen border'>
            <div className="sidebarMobileHidden">
                <NavLink className="ant-anchor-link" to="/home">Home</NavLink>
                <NavLink className="ant-anchor-link" to="/products">Products</NavLink>
                <NavLink className="ant-anchor-link" to="/products">Products</NavLink>
                <NavLink className="ant-anchor-link" to="/products">Products</NavLink>
                <NavLink className="ant-anchor-link" to="/products">Products</NavLink>
                <NavLink className="ant-anchor-link" to="/products">Products</NavLink>
                {user ? <Popconfirm
                    placement="bottom"
                    title="Are you sure want to logout?"
                    onConfirm={async () => {
                        await signOut(auth)
                        navigate('/home')
                    }}
                    okText="Logout"
                    cancelText="Cancel">
                    <a href='www.facebook.com' className={`ant-anchor-link text-white ${navbar && 'text-black'}`}>Logout</a>
                </Popconfirm> :
                    <NavLink className={`ant-anchor-link text-white ${navbar && 'text-black'}`} to="/login">Login</NavLink>}
            </div>
            <div className="sidebarMobileVisible">
                <Navbar />
            </div>

        </aside>
    );
};

export default Sidebar;