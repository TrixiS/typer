import * as React from "react";
import Router, { withRouter } from "next/router";
import useFetcher from "lib/useFetcher";
import withSession, { IronSessionRequest } from "lib/session";
import { User as UserDto } from "@prisma/client";
import { NextApiResponse, NextComponentType } from "next";
import { ApiHandler } from "lib/api";

export interface UseUserProps {
  redirectTo?: string;
  redirectIfFound?: boolean;
}

export type User = Partial<UserDto> & {
  isLoggedIn: boolean;
};

export type UserRequest = IronSessionRequest & {
  user: UserDto;
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

// TODO: Test all of these wrappers
export function withAuth(Component: NextComponentType) {
  const AuthComponent: NextComponentType = withRouter((props: any) => {
    const { user } = useUser({ redirectTo: "/signin" });
    if (user?.isLoggedIn) return <Component user={user} {...props} />;
  });

  if (Component.getInitialProps)
    AuthComponent.getInitialProps = Component.getInitialProps;

  return <AuthComponent />;
}

export function withUser(handler: ApiHandler) {
  const handlerAuthWrapper = (
    req: IronSessionRequest,
    res: NextApiResponse
  ) => {
    const user = req.session.get<UserDto>("user");

    if (user === null) return res.status(401).end();

    (req as UserRequest).user = user;
    return handler(req, res);
  };

  return withSession(handlerAuthWrapper);
}
