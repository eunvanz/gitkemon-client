import { Layout, Menu } from "antd";
import { User } from "../../types";
import "./AdminBaseLayout.less";

export interface AdminBaseLayoutProps {
  menuItems: {
    name: string;
    onClick: VoidFunction;
  }[];
  user?: User;
  onSignOut: VoidFunction;
}

const AdminBaseLayout: React.FC<AdminBaseLayoutProps> = ({
  menuItems,
  user,
  children,
  onSignOut,
}) => {
  return (
    <Layout className="admin-base-layout">
      <Layout.Sider className="side-bar">
        <div className="title">Gitkemon Admin</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[]}>
          {menuItems.map((item) => (
            <Menu.Item key={item.name} onClick={item.onClick}>
              {item.name}
            </Menu.Item>
          ))}
        </Menu>
      </Layout.Sider>
      <Layout className="site-layout">
        <Layout.Header className="site-layout-background header">
          {/* TODO: 유저 아바타 */}
        </Layout.Header>
        <Layout.Content className="content">{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AdminBaseLayout;
