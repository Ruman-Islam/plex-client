import {
    PieChartOutlined,
    DesktopOutlined,
    MailOutlined,
    UnorderedListOutlined,
    EditOutlined,
    UserOutlined,
    SettingOutlined,
    UsergroupAddOutlined,
    SnippetsFilled,
    FileAddOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Space } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebaseConfig';
import useAdmin from '../../hooks/useAdmin';
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Dashboard = () => {
    const [user, ,] = useAuthState(auth);
    const { admin } = useAdmin(user);

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
                        <SubMenu key='sub1' icon={<MailOutlined />} title='Admin'>
                            <Menu.Item key='3' icon={<UsergroupAddOutlined />}>
                                <NavLink to='all-user'>All users</NavLink>
                            </Menu.Item>
                            <Menu.Item key='4' icon={<SnippetsFilled />}>
                                <NavLink to='manage-orders'>Manage Orders</NavLink>
                            </Menu.Item>
                            <Menu.Item key='5' icon={<FileAddOutlined />}>
                                <NavLink to='add-product'>Add Product</NavLink>
                            </Menu.Item>
                            <Menu.Item key='6' icon={<UsergroupAddOutlined />}>
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
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Dashboard;