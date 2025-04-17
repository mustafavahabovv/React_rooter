import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Basket from './pages/Basket';

const Router = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/favorites" element={<Favorites />} />
    <Route path="/basket" element={<Basket />} />
  </Routes>
);

export default Router;
