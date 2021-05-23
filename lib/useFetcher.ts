import useSWR, { SWRResponse } from "swr";

export const fetcher = (input: any, ...args) =>
  fetch(input, ...args).then((res) => res.json());

export interface UseFetcherResponse<Data, Error>
  extends SWRResponse<Data, Error> {
  data: Data;
  isLoading: boolean;
  isError: Error;
}

export default function useFetcher<Data = any, Error = any>(
  route: string
): UseFetcherResponse<Data, Error> {
  const { data, error, ...rest } = useSWR<Data, Error>(route, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  };
}
