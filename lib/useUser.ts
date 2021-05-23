import * as React from "react";
import Router from "next/router";
import useSWR from "swr";

export interface UseUserProps {
  redirectTo?: string;
  redirectIfFound?: boolean;
}

export type User = {
  isLoggedIn: boolean;
  verified: boolean;
  email: string;
  username: string;
};

export default function useUser({
  redirectTo,
  redirectIfFound = false,
}: UseUserProps = {}) {
  const { data: user, mutate: mutateUser } = useSWR<User>("/api/user");

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
