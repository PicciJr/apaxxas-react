import React from 'react';
import { FaHome, FaPlusCircle, FaPiggyBank } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useGlobalContext } from '../../services/globalContext';

export default function BottomTabsNavigator() {
  const { user } = useGlobalContext();
  return (
    <div className="fixed bottom-0 z-10 w-full h-16 rounded-t-md bg-apxpurple-500">
      <div className="flex items-center justify-between h-full px-4">
        <NavLink
          to="/"
          className={`${user && 'pointer-events-none opacity-20'}`}>
          <FaHome className="w-8 h-8 text-white" />
        </NavLink>
        <NavLink
          to="nuevo-deposito"
          className={`${!user && 'pointer-events-none opacity-20'}`}>
          <FaPlusCircle className="w-8 h-8 text-white" />
        </NavLink>
        <NavLink
          to="resumen"
          className={`${!user && 'pointer-events-none opacity-20'}`}>
          <FaPiggyBank className="w-8 h-8 text-white" />
        </NavLink>
      </div>
    </div>
  );
}
