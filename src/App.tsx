import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/Home';
import NewDepositScreen from './screens/NewDeposit';
import DepositsSummary from './screens/DepositsSummary';

function App() {
  return (
    <div className='max-w-md mx-auto p-2'>
      <BrowserRouter>
        <Routes>
          <Route path="/nuevo-deposito" element={<NewDepositScreen />}/>
          <Route path="/resumen" element={<DepositsSummary />}/>
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
