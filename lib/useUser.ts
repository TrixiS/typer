import * as React from "react";
import Router from "next/router";
import useSWR from "swr";

export interface UseUserProps {
  redirectTo?: string;
  redirectIfFound?: boolean;
}

export default function useUser({
  redirectTo,
  redirectIfFound = false,
}: UseUserProps) {
  // TODO: add access token from persisted state (context)
  const { data: user, mutate: mutateUser } = useSWR("/api/user");

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
