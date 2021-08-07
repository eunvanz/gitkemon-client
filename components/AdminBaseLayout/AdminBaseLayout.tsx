import { Layout, Menu } from "antd";
import { User } from "../../types";
import styles from "./AdminBaseLayout.module.css";

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
    <Layout>
      <Layout.Sider className={styles.sideBar}>
        <div className={styles.title}>Gitkemon Admin</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[]}>
          {menuItems.map((item) => (
            <Menu.Item key={item.name} onClick={item.onClick}>
              {item.name}
            </Menu.Item>
          ))}
        </Menu>
      </Layout.Sider>
      <Layout className={styles.siteLayout}>
        <Layout.Header className={styles.header}>{/* TODO: 유저 아바타 */}</Layout.Header>
        <Layout.Content className={styles.content}>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AdminBaseLayout;
