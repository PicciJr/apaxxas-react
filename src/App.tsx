import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './ui/screens/Home';
import NewDepositScreen from './ui/screens/NewDeposit';
import DepositsSummary from './ui/screens/DepositsSummary';
import BottomTabsNavigator from './ui/components/BottomTabsNavigator';
import DepositDetail from './ui/screens/DepositDetail';
import NewExpend from './ui/screens/NewExpend';
import ExpensesSummary from './ui/screens/ExpensesSummary';

function App() {
  return (
    <div className="relative max-w-md py-2 mx-auto">
      <BrowserRouter>
        <BottomTabsNavigator />
        <Routes>
          <Route path="/nuevo-gasto/:depositId" element={<NewExpend />} />
          <Route path="/nuevo-deposito" element={<NewDepositScreen />} />
          <Route path="/deposito/:id" element={<DepositDetail />} />
          <Route path="/resumen" element={<DepositsSummary />} />
          <Route path="/historial/:depositId" element={<ExpensesSummary />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
