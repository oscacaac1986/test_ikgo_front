import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import InventoryProvider from './context/InventoryContext';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import Products from './pages/Products';

function App() {
  return (
    <Router>
      <InventoryProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/inventory" element={<Inventory />} />
          </Routes>
        </MainLayout>
      </InventoryProvider>
    </Router>
  );
}

export default App;