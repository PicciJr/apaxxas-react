import React, { useContext, useEffect, useState } from 'react';
import { User } from '../domain/user';
import { useAuth } from './firebaseAdapter';

/** Necesario hacer esto para que TSlint no se queje */
interface Props {
  children: React.ReactNode;
}

const GlobalContext = React.createContext<any>({});
export const useGlobalContext = () => useContext(GlobalContext);

export const Provider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { checkUserSession } = useAuth();
    const auth = checkUserSession().getAuth();
    checkUserSession().onAuthStateChanged(auth, (user) => {
      if (!user) return;
      setUser({
        alias: user?.providerData?.[0]?.email ?? 'unknown name',
        id: user?.uid ?? 'unknown ID',
        name: user?.providerData?.[0]?.displayName ?? 'unknown name',
        deposits: [],
        email: user?.providerData?.[0]?.email ?? 'unknown name',
      });
    });
  }, []);

  const value = {
    user,
    updateUser: setUser,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
