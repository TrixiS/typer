import Head from "next/head";
import Link from "next/link";
import { useUser } from "lib/auth";
import { AppProps } from "next/app";
import { Header } from "../components/Layout";
import { Menu } from "../components/Menu";
import { AccountDropdown } from "components/AccountDropdown";
import "antd/dist/antd.css";
import "../styles/globals.css";

function AppHeader() {
  // TODO: logo component <- logo

  // TODO: handle isLoading
  const { user, mutateUser } = useUser();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    await mutateUser({ isLoggedIn: false });
  };

  return (
    <Header>
      <Menu>
        <Link href="/">Home</Link>
        <Link href="/signup">Register</Link>
        {user?.isLoggedIn ? (
          <AccountDropdown
            overlayClassName="shadow-sm"
            user={user}
            onLogout={handleLogout}
            trigger={["click"]}
          />
        ) : (
          <Link href="/signin">Sign in</Link>
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
