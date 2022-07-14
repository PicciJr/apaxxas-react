import React from 'react';
import {
  FaHome,
  FaPlusCircle,
  FaPiggyBank,
  FaSignOutAlt,
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useGlobalContext } from '../../services/globalContext';
import { useAuthenticate } from '../../application/authenticate';
import { useNavigate } from 'react-router-dom';

export default function BottomTabsNavigator() {
  const { user, updateUser } = useGlobalContext();
  const navigate = useNavigate();

  const handleUserLogout = async () => {
    try {
      const { logOut } = useAuthenticate();
      await logOut();
      updateUser(null);
      navigate('/');
    } catch (err) {
      console.error('ERROR logout', err);
    }
  };

  return (
    <div className="fixed bottom-0 z-10 w-full h-16 rounded-t-md bg-apxpurple-500">
      <div className="flex items-center justify-between h-full px-4">
        {user ? (
          <FaSignOutAlt
            className="w-8 h-8 text-apxgray-500"
            onClick={handleUserLogout}
          />
        ) : (
          <NavLink
            to="/"
            className={`${user && 'pointer-events-none opacity-20'}`}>
            <FaHome className="w-8 h-8 text-white" />
          </NavLink>
        )}
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
