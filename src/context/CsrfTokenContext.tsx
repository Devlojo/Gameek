import { ReactNode, createContext, useState } from "react";

type TCsrfTokenContext = {
  csrfToken: string | null;
  setCsrfToken: React.Dispatch<React.SetStateAction<string | null>>;
};

type CsfrTokenProviderProps = {
  children: ReactNode;
};

export const CsrfTokenContext = createContext<TCsrfTokenContext | null>(null);

export const CsrfTokenProvider = ({ children }: CsfrTokenProviderProps) => {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  return (
    <CsrfTokenContext.Provider value={{ csrfToken, setCsrfToken }}>
      {children}
    </CsrfTokenContext.Provider>
  );
};
