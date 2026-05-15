import { ApiErrorType } from "@/api/base";
import {
  defaultShouldDehydrateQuery,
  environmentManager,
  matchQuery,
  MutationCache,
  QueryClient,
  QueryKey,
} from "@tanstack/react-query";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ApiErrorType;
    mutationMeta: {
      invalidates?: Array<QueryKey>;
      awaits?: Array<QueryKey>;
      toast?: {
        enableError?: boolean;
        title?: string;
      };
    };
  }
}

function makeQueryClient() {
  return new QueryClient({
    mutationCache: new MutationCache({
      onSuccess: async (_, __, ___, mutation, options) => {
        options.client.invalidateQueries({
          predicate: (query) =>
            mutation.meta?.invalidates?.some((queryKey) =>
              matchQuery({ queryKey, type: "all" }, query)
            ) ?? false,
        });

        if (mutation.meta?.awaits && mutation.meta.awaits?.length > 0) {
          await options.client.invalidateQueries({
            predicate: (query) =>
              mutation.meta?.awaits?.some((queryKey) =>
                matchQuery({ queryKey, type: "all" }, query)
              ) ?? false,
          });
        }
      },
    }),
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: false,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (environmentManager.isServer()) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
