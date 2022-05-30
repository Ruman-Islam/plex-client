import {
    PieChartOutlined,
    DesktopOutlined,
    UnorderedListOutlined,
    EditOutlined,
    UserOutlined,
    SettingOutlined,
    UsergroupAddOutlined,
    SnippetsFilled,
    FileAddOutlined,
    VerifiedOutlined,
    AppstoreAddOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Space } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebaseConfig';
import useAdmin from '../../hooks/useAdmin';
import useGetCurrentUser from '../../hooks/useGetCurrentUser';
import Spinner from '../../components/shared/Spinner';
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Dashboard = () => {
    const [user, loading,] = useAuthState(auth);
    const { admin, adminLoading } = useAdmin(user);
    const year = new Date().getFullYear();
    const { currentUser } = useGetCurrentUser(user.email);

    if (loading || adminLoading) {
        return (
            <div className='flex justify-center items-center h-[90vh]'>
                <Spinner />
            </div>
        )
    }

    return (
        <Layout>
            <Sider
                className='menu-style'
                breakpoint="lg"
                collapsedWidth="0"
            >
                <div className="logo">
                    <NavLink className="flex items-center text-primary" to="/">
                        <Space><span className='text-base-100'>PL</span> </Space>
                        <UnorderedListOutlined />
                        <Space> <span className='text-base-100'>X</span></Space>
                    </NavLink>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                >
                    <div className='flex items-center px-5 py-1 text-lg'>
                        <span>{currentUser?.name}</span>
                    </div>

                    {(user && !admin) &&
                        <>
                            <Menu.Item key='1' icon={<PieChartOutlined />}>
                                <NavLink to='my-orders'>My Orders</NavLink>
                            </Menu.Item>
                            <Menu.Item key='2' icon={<DesktopOutlined />}>
                                <NavLink to='add-review'>Add Review</NavLink>
                            </Menu.Item>
                        </>}

                    {(admin && user) &&
                        <SubMenu key='sub1' icon={<VerifiedOutlined />} title='Admin'>
                            <Menu.Item key='3' icon={<UsergroupAddOutlined />}>
                                <NavLink to='all-user'>All users</NavLink>
                            </Menu.Item>
                            <Menu.Item key='4' icon={<SnippetsFilled />}>
                                <NavLink to='manage-orders'>Manage Orders</NavLink>
                            </Menu.Item>
                            <Menu.Item key='5' icon={<FileAddOutlined />}>
                                <NavLink to='add-product'>Add Product</NavLink>
                            </Menu.Item>
                            <Menu.Item key='6' icon={<AppstoreAddOutlined />}>
                                <NavLink to='manage-products'>Manage Products</NavLink>
                            </Menu.Item>
                            <Menu.Item key='7' icon={<UsergroupAddOutlined />}>
                                <NavLink to='add-admin'>Manage Admin</NavLink>
                            </Menu.Item>
                        </SubMenu>}

                    <SubMenu key='sub2' icon={<SettingOutlined />} title='Account'>
                        <Menu.Item key='9' icon={<UserOutlined />}>
                            {user && <NavLink to='profile'>Profile</NavLink>}
                        </Menu.Item>
                        <Menu.Item key='10' icon={<EditOutlined />}>
                            {user && <NavLink to='edit-profile'>Edit</NavLink>}
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>

            <Layout className="site-layout">
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px 0',
                        padding: 24,
                    }}
                >
                    <Outlet />
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    All Rights reserves to Ruman Islam ©{year}
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Dashboard;