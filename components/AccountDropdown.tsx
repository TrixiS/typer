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
  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <Link href={`/profile/${user.id}`}>Profile</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={onLogout} key="logout" danger>
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} {...rest}>
      <a
        className="flex flex-row ant-dropdown-link gap-x-2 items-center"
        onClick={(e) => e.preventDefault()}
      >
        {user.username} <UserOutlined />
      </a>
    </Dropdown>
  );
}
