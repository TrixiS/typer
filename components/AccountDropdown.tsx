import Link from "next/link";
import { Menu, Dropdown, DropDownProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { User } from "lib/auth";

export type AccountDropdownProps = Omit<DropDownProps, "overlay"> & {
  user: User;
  onLogout: () => void;
};

export function AccountDropdown({
  user,
  onLogout,
  ...rest
}: AccountDropdownProps) {
  // TODO: profile/user

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <Link href="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={onLogout} key="logout" danger>
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} {...rest}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        {/* // TODO: up icon */}
        {user.username} <UserOutlined />
      </a>
    </Dropdown>
  );
}
