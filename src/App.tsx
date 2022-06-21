import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './ui/screens/Home';
import NewDepositScreen from './ui/screens/NewDeposit';
import DepositsSummary from './ui/screens/DepositsSummary';
import BottomTabsNavigator from './ui/components/BottomTabsNavigator';

function App() {
  return (
    <div className="relative max-w-md py-2 mx-auto">
      <BrowserRouter>
        <BottomTabsNavigator />
        <Routes>
          <Route path="/nuevo-deposito" element={<NewDepositScreen />} />
          <Route path="/resumen" element={<DepositsSummary />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
