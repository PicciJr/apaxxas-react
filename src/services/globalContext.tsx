import React, { useContext, useState } from 'react';

/** Necesario hacer esto para que TSlint no se queje */
interface Props {
  children: React.ReactNode;
}

const GlobalContext = React.createContext<any>({});
export const useGlobalContext = () => useContext(GlobalContext);

export const Provider: React.FC<Props> = ({ children }) => {
  // TODO: hacer un sistema de login dinamico en la app
  const [user, setUser] = useState({
    name: 'Andres Piccininno',
    alias: '@PicciJr',
    id: '1',
  });

  const value = {
    user,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
