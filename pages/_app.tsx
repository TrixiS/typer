import Head from "next/head";
import Link from "next/link";
import { AppProps } from "next/app";
import { Header } from "../components/Layout";
import { Menu } from "../components/Menu";
import "antd/dist/antd.css";
import "../styles/globals.css";

function AppHeader() {
  // TODO: dropdown in menu
  // TODO: logo component <- logo

  return (
    <Header>
      <Menu>
        <Link href="/">Home</Link>
        <Link href="/register">Register</Link>
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

      <div className="flex flex-col">
        <Component {...pageProps} />
      </div>
    </>
  );
}
