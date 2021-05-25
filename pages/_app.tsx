import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useUser } from "lib/auth";
import { AppProps } from "next/app";
import { Header } from "components/Layout";
import { Menu, MenuItem } from "components/Menu";
import { AccountDropdown } from "components/AccountDropdown";
import "antd/dist/antd.css";
import "../styles/globals.css";

function AppHeader() {
  // TODO: logo component <- logo
  const { user, mutateUser } = useUser();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    await mutateUser({ isLoggedIn: false });
    await Router.push("/signin");
  };

  return (
    <Header>
      <Menu>
        <MenuItem>
          <Link href="/">Home</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/signup">Register</Link>
        </MenuItem>
        {user?.isLoggedIn ? (
          <MenuItem selectable={false}>
            <AccountDropdown
              overlayClassName="shadow-sm"
              user={user}
              onLogout={handleLogout}
              trigger={["click"]}
            />
          </MenuItem>
        ) : (
          <MenuItem>
            <Link href="/signin">Sign in</Link>
          </MenuItem>
        )}
      </Menu>
    </Header>
  );
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Typer</title>
        <meta
          name="description"
          content="The game based on your typing speed"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppHeader />
      <Component {...pageProps} />
    </>
  );
}
