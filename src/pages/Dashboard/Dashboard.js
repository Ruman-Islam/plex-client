import {
    PieChartOutlined,
    DesktopOutlined,
    MailOutlined,
    UnorderedListOutlined,
    EditOutlined,
    UserOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Space } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebaseConfig';
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Dashboard = () => {
    const [user, ,] = useAuthState(auth);

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
                    <SubMenu key='sub2' icon={<SettingOutlined />} title='Account'>
                        <Menu.Item key='1' icon={<UserOutlined />}>
                            {user && <NavLink to='profile'>Profile</NavLink>}
                        </Menu.Item>
                        <Menu.Item key='2' icon={<EditOutlined />}>
                            {user && <NavLink to='edit-profile'>Edit</NavLink>}
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key='3' icon={<PieChartOutlined />}>
                        {user && <NavLink to='my-orders'>My Orders</NavLink>}
                    </Menu.Item>
                    <Menu.Item key='4' icon={<DesktopOutlined />}>
                        {user && <NavLink to='add-review'>Add Review</NavLink>}
                    </Menu.Item>
                    <SubMenu key='sub1' icon={<MailOutlined />} title='Admin'>
                        {/* <Menu.Item key='5' icon={<ContainerOutlined />}>
                            {user && <NavLink to='my-profile'>Profile</NavLink>}
                        </Menu.Item> */}
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