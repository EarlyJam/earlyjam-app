import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRouter, RouterProvider } from "@tanstack/react-router";

import Providers from "@/components/util-components/Providers";

import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  context: {
    authProfile: undefined,
    authUser: undefined,
    payment: undefined,
    contextInitiated: false
  }
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000 // 1 minute
      // cacheTime is not supported in this version or type, so omit it
    }
  }
});

function LoadingScreen() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <span className="text-lg font-semibold">Loading...</span>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Providers>
        {({ routerContext }) =>
          routerContext.contextInitiated ? (
            <RouterProvider router={router} context={routerContext} />
          ) : (
            <LoadingScreen />
          )
        }
      </Providers>
    </QueryClientProvider>
  );
}

export default App;
