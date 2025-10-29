import { ReactNode, createContext, useEffect, useState } from "react";
import { TUser } from "@/types/user";
import axios from "axios";
import { apiUrl } from "@/config";

type TUserContext = {
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  loading: boolean;
};

type UserProviderProps = {
  children: ReactNode;
};

export const UserContext = createContext<TUserContext | null>(null);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${apiUrl}/profile`, {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false); // toujours, succès ou erreur
      }
    };
    fetchProfile();
  }, [apiUrl]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
