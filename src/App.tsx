import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/Home';
import NewDepositScreen from './screens/NewDeposit';
import DepositsSummary from './screens/DepositsSummary';
import BottomTabsNavigator from './components/BottomTabsNavigator';

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
