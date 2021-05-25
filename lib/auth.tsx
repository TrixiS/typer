import * as React from "react";
import Router, { withRouter } from "next/router";
import { NextComponentType } from "next";
import useFetcher from "lib/useFetcher";

export interface UseUserProps {
  redirectTo?: string;
  redirectIfFound?: boolean;
}

export type User = {
  isLoggedIn: boolean;
  verified?: boolean;
  email?: string;
  username?: string;
};

export interface AuthComponentProps<T> extends React.HTMLAttributes<T> {
  user: User;
}

export function useUser({
  redirectTo,
  redirectIfFound = false,
}: UseUserProps = {}) {
  const { data: user, mutate: mutateUser } = useFetcher<User>("/api/user");

  React.useEffect(() => {
    if (!redirectTo || !user) return;

    if (
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn)
    )
      Router.push(redirectTo);
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}

// TODO: test it
export function withAuth(Component: NextComponentType) {
  const AuthComponent: NextComponentType = withRouter((props: any) => {
    const { user } = useUser({ redirectTo: "/signin" });
    if (user?.isLoggedIn) return <Component user={user} {...props} />;
  });

  if (Component.getInitialProps)
    AuthComponent.getInitialProps = Component.getInitialProps;

  return <AuthComponent />;
}
