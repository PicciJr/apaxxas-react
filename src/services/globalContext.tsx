import React, { useContext, useState } from 'react';

/** Necesario hacer esto para que TSlint no se queje */
interface Props {
  children: React.ReactNode;
}

const GlobalContext = React.createContext<any>({});
export const useGlobalContext = () => useContext(GlobalContext);

export const Provider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState();

  const value = {
    user,
    updateUser: setUser,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
