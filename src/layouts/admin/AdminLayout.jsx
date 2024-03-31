import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
  FormOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  Space,
  theme,
  Dropdown,
  Avatar,
  Button,
} from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfoAction } from "store/actions/userAction";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(
    "User",
    "1",
    <NavLink to="/admin/userlist">
      <UserOutlined />
    </NavLink>
  ),
  getItem(
    "Films",
    "sub1",

    <PieChartOutlined />,
    [
      getItem(
        "Films",
        "3",
        <NavLink to="/admin/films">
          <Space>
            <FormOutlined />
          </Space>
        </NavLink>
      ),
      getItem(
        "Addnew",
        "4",
        <NavLink to="/admin/films/addnew">
          <Space>
            <FileAddOutlined />
          </Space>
        </NavLink>
      ),
    ]
  ),
];

export const AdminLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stateUser = useSelector((state) => state.userReducer);
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem("USER_INFO_KEY");
    dispatch(setUserInfoAction(null));
    navigate("/");
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            background: colorBgContainer,
          }}
        >
          <div className="text-right">
            {stateUser.userInfo && (
              <div style={{ textAlign: "right" }}>
                <span>
                  <div className="btn-group">
                    <a
                      className="btn btn-secondary dropdown-toggle text-dark"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      style={{
                        backgroundColor: "transparent",
                        outline: "none",
                        border: "none",
                      }}
                    >
                      <Space className="mr-2">
                        <Avatar
                          style={{ backgroundColor: "#87d068" }}
                          icon={<UserOutlined />}
                        />
                      </Space>
                      {stateUser.userInfo.hoTen}
                    </a>

                    <div className="dropdown-menu dropdown-menu-right text-center">
                      <button
                        onClick={() => navigate("/")}
                        className="dropdown-item"
                        type="button"
                      >
                        Home
                      </button>
                      <Button size="middle" danger onClick={handleLogout}>
                        Đăng xuất
                      </Button>
                    </div>
                  </div>
                </span>
              </div>
            )}
          </div>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Films</Breadcrumb.Item>
            <Breadcrumb.Item>Addnew</Breadcrumb.Item>
          </Breadcrumb>

          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
