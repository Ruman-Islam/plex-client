import { Popconfirm } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebaseConfig';
import Navbar from '../shared/Navbar';

const Sidebar = () => {
    const [user, ,] = useAuthState(auth);
    const navigate = useNavigate();
    return (
        <aside className='bg-base-100 h-screen border'>
            <div className="logo hidden xl:block">
                <NavLink className="text-black" to="/">
                    <span className='flex justify-start my-5 ml-5 text-3xl'>PL<AiOutlineMenu className='text-primary' />X</span>
                </NavLink>
            </div>
            <div className="sidebarMobileHidden w-56">
                <NavLink className="ant-anchor-link" to="/home">Home</NavLink>
                {user ? <Popconfirm
                    placement="bottomRight"
                    title="Are you sure want to logout?"
                    onConfirm={async () => {
                        await signOut(auth)
                        navigate('/home')
                    }}
                    okText="Logout"
                    cancelText="Cancel">
                    <a href='www.facebook.com' className="ant-anchor-link">Logout</a>
                </Popconfirm> :
                    <NavLink className="ant-anchor-link" to="/login">Login</NavLink>}
            </div>
            <div className="sidebarMobileVisible">
                <Navbar />
            </div>
        </aside>
    );
};

export default Sidebar;