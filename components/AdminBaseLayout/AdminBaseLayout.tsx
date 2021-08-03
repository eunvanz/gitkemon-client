import { Layout, Menu, Typography } from "antd";
import { User } from "../../types";
import "./AdminBaseLayout.less";

export interface AdminBaseLayoutProps {
  menuItems: {
    name: string;
    onClick: VoidFunction;
    icon: React.ReactNode;
  }[];
  user: User;
}

const AdminBaseLayout: React.FC<AdminBaseLayoutProps> = ({
  menuItems,
  user,
  children,
}) => {
  return (
    <Layout className="admin-base-layout">
      <Layout.Sider className="side-bar">
        <Typography.Title level={3}>Gitkemon Admin</Typography.Title>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[]}>
          {menuItems.map((item) => (
            <Menu.Item key={item.name} icon={item.icon} onClick={item.onClick}>
              {item.name}
            </Menu.Item>
          ))}
        </Menu>
      </Layout.Sider>
      <Layout className="site-layout">
        <Layout.Header className="site-layout-background header">
          {/* TODO: 유저 아바타 */}
        </Layout.Header>
        <Layout.Content className="content">
          <div className="site-layout-background content-body">{children}</div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AdminBaseLayout;
