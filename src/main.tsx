import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { UserProvider } from "@/context/UserContext";
import { CsrfTokenProvider } from "@/context/CsrfTokenContext";
import { NotificationCountProvider } from "@/context/NotificationCountContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <CsrfTokenProvider>
          <NotificationCountProvider>
            <App />
          </NotificationCountProvider>
        </CsrfTokenProvider>
      </UserProvider>
      {<ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </StrictMode>,
);
