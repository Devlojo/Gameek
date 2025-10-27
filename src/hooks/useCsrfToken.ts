// Custom hooks
import { useContext } from "react";
import { CsrfTokenContext } from "@/context/CsrfTokenContext";

export const useCsrfToken = () => {
  const context = useContext(CsrfTokenContext);
  if (!context) {
    throw new Error(
      "useCsrfToken doit être utilisé dans un <CsrfTokenProvider>",
    );
  }
  return context;
};
