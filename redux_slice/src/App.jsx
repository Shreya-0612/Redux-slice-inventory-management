import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute';
import Login from './components/login';
import HomePage from './components/home';
import './App.css';
import Dashboard from './components/dashboard';
import AddUser  from './components/addUser';
import AddInventory from './components/addInventory';
import ViewProduct from './components/seeProducts';
import InventoryDetails from './components/inventoryDetails';
import DeleteInventory from './components/deleteInventory';
import UpdateProduct from './components/updateProduct';
import ManageInventory from './components/manageInventory';
import EditOptions from './components/editInventoryOptions';
import ShowUsers from './components/showUsers';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }>
          <Route path="/dashboard/add-user" element={<AddUser  />} />
          <Route path="/dashboard/add-inventory" element={<AddInventory />} />
          <Route path="/dashboard/view-product" element={<ViewProduct />} />
          <Route path="/dashboard/view-product/:category" element={<ViewProduct />} /> {/* New route for category */}
          <Route path="/dashboard/show-users" element={<ShowUsers />} />
          <Route path="/dashboard/inventory-details/:sku" element={<InventoryDetails />} />
          <Route path="/dashboard/view-product/edit-options/delete-inventory/:sku" element={<DeleteInventory />} />
          <Route path="/dashboard/view-product/edit-options/update-product/:sku" element={<UpdateProduct />} />
          <Route path="/dashboard/view-product/edit-options/manage-inventory/:sku" element={<ManageInventory />} />
          <Route path="/dashboard/view-product/edit-options/:sku" element={<EditOptions />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
