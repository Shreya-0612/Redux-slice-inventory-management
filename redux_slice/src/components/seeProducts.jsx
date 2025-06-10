import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectInventoryLoading, selectInventoryError, selectGetAllInventorys } from "../redux/selector/selector";
import { getInventoriesAction } from "../redux/action/inventoryAction";
import InventoryCard from './gridView'; 
import ListView from './listView'; 

const ViewProduct = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectInventoryLoading);
  const error = useSelector(selectInventoryError);
  const inventories = useSelector(selectGetAllInventorys);
  const [isGridView, setIsGridView] = useState(true);

  useEffect(() => {
    dispatch(getInventoriesAction());
  }, [dispatch]);
  
  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  return (
    <div className="max-w-5xl mx-auto m-10">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-gray-800 py-5 px-6 border-b flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Inventory Catalog</h2>
          <span className="bg-gray-600 text-white text-sm py-1 px-3 rounded-full">
            {inventories.length} Products
          </span>
          <button 
            onClick={toggleView} 
            className="bg-gray-600 text-white rounded-lg p-2"
          >
            {isGridView ? "Switch to List View" : "Switch to Grid View"}
          </button>
        </div>
        
        <div className="p-6">
          {loading && (
            <div className="text-blue-500 text-center mb-6 py-3 bg-blue-50 rounded-md">
              <span className="font-medium">Loading products...</span>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
              <strong className="font-bold">Error: </strong>
              <span>{error}</span>
            </div>
          )}
          
          {!loading && inventories.length === 0 && !error && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-5xl mb-4">📦</div>
              <p className="text-gray-500 text-lg">No products available.</p>
              <p className="text-gray-400">Products will appear here once added to the inventory.</p>
            </div>
          )}
          
          <div className="flex flex-wrap -mx-3">
            {isGridView ? (
              inventories.map((inventory) => (
                <InventoryCard key={inventory.sku} inventory={inventory} />
              ))
            ) : (
              <ListView inventories={inventories} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;