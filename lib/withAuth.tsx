import useUser from "lib/useUser";
import { NextComponentType } from "next";
import { withRouter } from "next/router";

export default function withAuth(Component: NextComponentType) {
  const AuthComponent: NextComponentType = withRouter((props: any) => {
    const { user } = useUser();

    if (!user?.isLoggedIn) return props.router.push("/login");

    return <Component {...props} />;
  });

  if (Component.getInitialProps)
    AuthComponent.getInitialProps = Component.getInitialProps;

  return <AuthComponent />;
}
